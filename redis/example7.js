/* eslint-disable */
const redis = require('redis')
const { promisify } = require('util')
const client = redis.createClient()

const zadd = promisify(client.zadd).bind(client)
const zremrangebyscore = promisify(client.zremrangebyscore).bind(client)
const zcard = promisify(client.zcard).bind(client)
const expireTime = promisify(client.expire).bind(client)

async function limit (key, period, max_count) {
  let now = Date.now() // 毫秒数
  const timestamp = process.hrtime()
  now += timestamp[1] / (10 ** 8)
  console.log(now)
  // 记录行为
  await zadd(key, now, now)
  // 移除时间窗口之外的数据
  await zremrangebyscore(key, 0, now - period * 1000)
  // 获取窗口内的数据
  const count = await zcard(key)
  // 设置过期时间，避免不活跃的数据占据内存空间
  await expireTime(key, period + 1)
  return count <= max_count
}

for (let i = 0; i < 10; i++) {
  limit('time:123456', 60, 5).then(console.log)
}
