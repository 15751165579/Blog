/* eslint-disable */
const redis = require('redis')
const uuid = require('node-uuid')
const { promisify } = require('util')
const client = redis.createClient()

const zadd = promisify(client.zadd).bind(client)
const zremrangebyscore = promisify(client.zremrangebyscore).bind(client)
const zcard = promisify(client.zcard).bind(client)
const expireTime = promisify(client.expire).bind(client)

function limit (key, period, max_count) {
  let now = Date.now() // 毫秒数
  const id = uuid.v4()
  const multi = client.multi()
  .zadd(key, now, id) // 记录行为 这个地方一定要保证value的唯一性
  .zremrangebyscore(key, 0, now - period * 1000) // 移除时间窗口之外的数据 
  .zcard(key) // 获取窗口内的数据 
  .expire(key, period + 1) // 设置过期时间，避免不活跃的数据占据内存空间

  return new Promise((resolve, reject) => {
    multi.exec((err, replies) => {
      if (err) {
        reject(new Error('Redis报错'))
      }
      const [,,current_count] = replies
      resolve(current_count <= max_count)
    })
  })
}

for (let i = 0; i < 10; i++) {
  limit('demo', 60, 5).then(console.log)
}
