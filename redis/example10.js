/* eslint-disable */
const redis = require('redis')
const { promisify } = require('util')
const client = redis.createClient()

const set = promisify(client.set).bind(client)
const scan = promisify(client.scan).bind(client)

// 插入10000条Key
// for (let i = 0; i < 10000; i++) {
//   set(`key${i}`, i)
// }

const result = []

!(async () => {
  let cursor, ret
  
  while (cursor != 0) {
    try {
      console.log(`当前的游标为: ${cursor || 0}`)
      !([cursor, ret] = await scan(cursor || 0, 'match', 'key999*', 'count', 50000)) // 本地数据库的Key有10W个
      ret.forEach(item => result.push(item))
    } catch (e) {
      console.log(e)
    }
  }

  console.log(result)
})()

