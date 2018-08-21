/* eslint-disable */
const redis = require('redis')
const { promisify } = require('util')
const cmds = ['cl.throttle']
cmds.forEach(item => redis.addCommand(item))

const client = redis.createClient()
const clThrottle = promisify(client.cl_throttle).bind(client)

for (let i = 0; i < 20; i++) {
  clThrottle('app:login', 15, 30, 60).then(res => {
    const [isallowed, capacity, quota, retry, complete ] = res
    if (!isallowed) {
      // 允许调用
      console.log(`当前剩余空间为: ${quota}`)
      sayHi(i)
    } else {
      console.log('当前漏斗已满，需要等待')
      // 不允许
      setTimeout(_ => {
        console.log(`这是${retry}秒后重试的方法`)
        sayHi(i)
      }, retry * 1000)
    }
  })
}

function sayHi (index) {
  console.log(`hello ${index + 1}`)
}