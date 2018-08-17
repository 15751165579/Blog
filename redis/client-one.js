const express = require('express')
const redis = require('redis')
const kue = require('kue')
const uuid = require('node-uuid')
const jobs = kue.createQueue()
const { promisify } = require('util')
const app = express()
const client = redis.createClient()
const incrPromise = promisify(client.incrby).bind(client)
const setPromise = promisify(client.set).bind(client)
const getPromise = promisify(client.get).bind(client)
const removePromise = promisify(client.del).bind(client)
app.use(kue.app)

app.get('/score', async (req, res) => {
  const s = await incrPromise('score', 1) // 的确是原子性的
  console.log(s)
  res.json({})
})

// 未支付订单5分钟后释放
app.post('/order', async (req, res) => {
  const orderInfo = {
    orderId: uuid.v4(),
    money: Math.random() * 10000
  }
  console.log(orderInfo)
  // 保存这个未完成的订单
  await setPromise(orderInfo.orderId, JSON.stringify(orderInfo))
  // 设置延迟处理订单是否支付
  jobs.create('order', orderInfo).delay(5000).priority('high').attempts(5).save(err => {
    if (err) {
      return res.json(err)
    }
    res.json({
      message: '订单已经加入延迟队列处理',
      data: orderInfo
    })
  })
})

app.post('/pay', async (req, res) => {
  const { orderId } = req.query
  console.log('进行支付')
  await removePromise(orderId)
  res.json({
    message: '订单支付完成'
  })
})

jobs.process('order', 10, (job, done) => {
  const { orderId } = job.data
  getPromise(orderId).then(res => {
    if (!res) {
      // 已经不在待付订单
      console.log('订单已经完成')
    } else {
      // 这时我们需要删除订单
      console.log('删除订单，释放库存')
      done()
    }
  })
})

app.listen(4000)