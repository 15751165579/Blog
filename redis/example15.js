/* eslint-disable */
const redis = require('redis')
const { promisify } = require('util')
const express = require('express')
const client = redis.createClient()
const get = promisify(client.get).bind(client)
const set = promisify(client.set).bind(client)
const del = promisify(client.del).bind(client)
const watch = promisify(client.watch).bind(client)

const app = express()
// incr incby 的原子性并不能应用所有的场景

// 普通的方式不发避免并发的情况
async function start (index) {
  const age = await get('age')
  const result = await set('age', age * 2)
  console.log(`第${index + 1}次： ${result}`)
}

// 当大量的并发请求的时候，导致的超时处理成为一个棘手的问题。
// 并且Redis的分布式锁是一种悲观锁
async function startTwo (index) {
  const result = await set('lock:age', true, 'ex', 5, 'nx')
  if (result === 'OK') {
    const age = await get('age')
    await set('age', age * 2)
    await del('lock:age')
  } else {
    // 坑被占
    console.log('坑被占用，我需要再尝试一次')
    await startTwo()
  }
}
// 乐观锁 watch
async function startThree (index) {
  // 不解
  const client = redis.createClient()
  const watch = promisify(client.watch).bind(client)
  const get = promisify(client.get).bind(client)
  while (true) {
    await watch('age')
    const age = await get('age')
    const result = await multiSet(client, age)
    if (result == null) {
      // 事务被打断，正在重试
      continue
    } else {
      // 完成
      break
    }
  }
  const age = await get('age')
  console.log(age)
  return age
}

function multiSet (client, age) {
  const multi = client.multi().set('age', age * 2)
  return new Promise((resolve, reject) => {
    multi.exec((err, res) => {
      if (err) {
        return reject(err)
      }
      resolve(res)
    })
  })
}

// for (let i = 0; i < 10; i++) {  
//   startThree(i)
// }

// 会出现失败的情况
app.get('/demo', async (req, res) => {
  while (true) {
    await watch('age')
    const age = await get('age')
    const result = await multiSet(client, age)
    if (result == null) {
      // 事务被打断，正在重试
      continue
    } else {
      // 完成
      break
    }
  }
  const age = await get('age')
  console.log(age)
  res.json({
    age
  })
})
// 这种分布式锁解决高并发是没有问题的
app.get('/demo1', async (req, res) => {
  await handle(res)
})

async function handle (res) {
  try {
    const result = await set('lock:age', true, 'ex', 5, 'nx')
    if (result === 'OK') {
      let age = await get('age')
      await set('age', age * 2)
      await del('lock:age')
      age = await get('age')
      console.log(age)
      res.json({
        age
      })
    } else {
      // 坑被占
      console.log('坑被占用，我需要再尝试一次')
      await handle(res)
    }
  } catch (e) {
    console.log(e)
  }
}

app.listen(4000)
