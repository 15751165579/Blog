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
        domain: 'localhost', // 当domain不指定任何值时，Cookie仅限于当前的主机，如果设置domin=abc.com，那么子域sub.abc.com能够共享该Cookie。
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
