const http = require('http')
const iconv = require('iconv-lite')

const server = http.createServer((req, res) => {
  const encoding = req.headers['charset']
  let chunks = []

  req.on('data', chunk => {
    chunks.push(chunk)
  })

  req.on('end', () => {
    chunks = Buffer.concat(chunks)
    res.end(iconv.decode(chunks, encoding))
  })
})

server.listen(12345)

