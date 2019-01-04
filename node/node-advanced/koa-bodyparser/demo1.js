const request = require('request')
const iconv = require('iconv-lite')

request.post({
  url: 'http://10.1.1.248:12345/',
  body: iconv.encode('我是谁', 'utf8'),
  headers: {
    'Content-Type': 'text/plain',
    'Charset': 'utf8'
  }
}, (error, response, body) => {
  console.log(body)
})

