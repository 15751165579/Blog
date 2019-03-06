const http = require('http')
const Cookies = require('./server-cookie')

const keys = ['keys']

const server = http.createServer((req, res) => {
  const cookies = new Cookies(req, res, { keys })

  res.setHeader('123', '213')

  cookies.set('foo', 'a', { sameSite: 'strict', signed: false })
  cookies.set('bar', 'b', { sameSite: 'lax', signed: false })
  cookies.set('baz', 'c')

  res.end(`
    <html>
      <body>b页面</body>
    </html>
  `)
})

server.listen(4000, () => {
  console.log('listen on http://127.0.0.1:4000/')
})