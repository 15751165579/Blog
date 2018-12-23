const Koa = require('koa')

const app = new Koa()

app.use(async ctx => {
  if (ctx.path === '/hello' && ctx.method === 'GET') {
    ctx.body = 'Hello Koa'
  }
})

app.listen(1234)