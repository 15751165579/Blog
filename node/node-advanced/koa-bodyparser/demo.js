const http = require('http')
const iconv = require('iconv-lite')


// http.createServer((req, res) => {
//   const body = []

//   req.on('data', chunk => {
//     body.push(chunk)
//   })
  
//   req.on('end', () => {
//     res.end(Buffer.concat(body).toString())
//   })
// }).listen(1234)

http.createServer((req, res) => {
  const contentType = req.headers['content-type']
  const charsetStr = contentType.split(';')[1]
  const charset = charsetStr && charsetStr.split('=')[1]
  const body = []

  req.on('data', chunk => {
    body.push(chunk)
  })
  
  req.on('end', () => {
    const chunks = Buffer.concat(body)
    res.end(iconv.decode(chunks, charset))
  })
}).listen(1234)