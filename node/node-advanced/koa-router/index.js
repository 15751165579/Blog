const Koa = require('koa')
const KoaRouter = require('koa-router')
const app = new Koa()

const router = new KoaRouter()

router.post('/user', ctx => {
  ctx.body = '123'
})

app.use(router.routes()).use(router.allowedMethods())

app.listen(4444)