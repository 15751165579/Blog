const http = require('http')
const fs = require('fs')
const path = require('path')

// const server = http.createServer((req, res) => {
//   fs.readFile(path.join(__dirname, './demo.txt'), (err, data) => {
//     res.end(data)
//   })
// })

// stream的方式
const server = http.createServer((req, res) => {
  const stream = fs.createReadStream(path.join(__dirname, './demo.txt'))
  stream.pipe(res)
})

server.listen(12345)