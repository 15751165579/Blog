const Koa = require('koa')
const path = require('path')
const KoaStatic = require('koa-static')
const app = new Koa()

const STATIC_PATH = './static'

app.use(KoaStatic(
  path.join(__dirname, STATIC_PATH)
))

app.use(async ctx => {
  const { url } = ctx
  if (url === '/login') {
    ctx.cookies.set(
      'name',
      'demo',
      {
        domain: 'localhost',
        path: '/',
        maxAge: 10 * 60 * 1000,
        httpOnly: false
      }
    )
  }
  ctx.body = 'hello world'
})

app.listen(1234, () => {
  console.log(`[app] start at port 1234`)
})
