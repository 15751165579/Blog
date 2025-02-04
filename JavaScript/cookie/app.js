const http = require('http')
const Cookies = require('./server-cookie')

const keys = ['keys']

const server = http.createServer((req, res) => {
  const cookies = new Cookies(req, res, { keys })

  res.setHeader('123', '213')

  cookies.set('foo', 'a')
  cookies.set('bar', 'b')
  cookies.set('baz', 'c')

  res.end(`
    <html>
      <body>a页面</body>
      <a href="http://localhost:4000/">点击进入b页面</a>
    </html>
  `)
})

server.listen(3000, () => {
  console.log('listen on http://127.0.0.1:3000/')
})