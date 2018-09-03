// node_redis 不支持集群处理
const Redis = require('ioredis')
const Koa = require('koa')
const app = new Koa()

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

app.use(async (ctx) => {
  const { str } = ctx.query
  const info = await client.set(str, str)
  ctx.body = {
    info
  }
})

app.listen(8080)