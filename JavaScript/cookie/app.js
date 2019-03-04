const http = require('http')
const Cookies = require('./server-cookie')

const keys = ['keys']

const server = http.createServer((req, res) => {
  const cookies = new Cookies(req, res, { keys })

  res.setHeader('123', '213')
  
  const lastTime = cookies.get('lastTime', { signed: true })

  cookies.set('lastTime', new Date().toISOString(), { signed: true })

  res.end(`welcome back : ` + lastTime)
})

server.listen(3000, () => {
  console.log('listen on http://127.0.0.1:3000/')
})