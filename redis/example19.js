// node_redis 不支持集群处理
const Redis = require('ioredis')

const client = new Redis({
  sentinels: [
    {
      host: 'localhost',
      port: 26379
    },
    {
      host: 'localhost',
      port: 36379
    },
    {
      host: 'localhost',
      port: 46379
    }
  ],
  name: 'mymaster'
})

client.set('foo', 'demo').then(res => {
  console.log(res)
}).catch(err => {
  console.log(err)
})