const redis = require('redis')
const { promisify } = require('util')
const cmds = ['bf.add', 'bf.exists', 'bf.madd', 'bf.mexists', 'bf.reserve']
cmds.forEach(item => redis.addCommand(item))
const client = redis.createClient()
const bfAdd = promisify(client.bf_add).bind(client)
const bfExists = promisify(client.bf_exists).bind(client)
const bfMAdd = promisify(client.bf_madd).bind(client)
const bfMExists = promisify(client.bf_mexists).bind(client)
const bfReserve = promisify(client.bf_reserve).bind(client)
const del = promisify(client.del).bind(client)

/* eslint-disable */
function demo1 () {
  bfAdd('data', 'user1').then(() => {
    return bfExists('data', 'user1')
  })
  .then(res => {
    console.log(`user1是否存在？ ${res === 1 ? '存在' : '不存在'}`)
    return bfExists('data', 'user2')
  })
  .then(res => {
    console.log(`user2是否存在？${res === 1 ? '存在' : '不存在'}`)
    return bfMAdd('data', 'user2', 'user3', 'user4')
  })
  .then(res => {
    console.log(res)
    return bfMExists('data', 'user1', 'user2', 'user5', 'user6')
  })
  .then(res => {
    console.log(res)
  })
  .catch(err => {
    console.log(err)
  })
}

// 这种会出现误判的情况
async function demo2 (min = 100, max = 1000) {
  const testcase = new Array(min).fill(0)
  await Promise.all(testcase.map((item, index) => bfAdd('data', `user${index}`)))
  const testcase1 = []
  for (let i = min;i < max; i++) {
    testcase1.push(bfExists('data', `user${i}`))
  }
  const info = await Promise.all(testcase1)
  info.forEach((item, index) => {
    if (item === 1) {
      console.log(`误判 ${index + min}`)
    }
  })
}

// 减少误判， 设置误判率在0.001 预期数据在10000
async function demo3 () {
  await del('data')
  await bfReserve('data', 0.001, 10000)
  await demo2()
}

demo3()