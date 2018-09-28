const http = require('http')
let count = 0
http.createServer((req, res) => {
  res.writeHead(200)
  count++
  console.log(`${process.pid} ** ${count}`)
  res.end('hello world \n')
}).listen(8000)