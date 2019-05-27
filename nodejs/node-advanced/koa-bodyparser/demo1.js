const request = require('request')
const iconv = require('iconv-lite')

request.post({
  url: 'http://10.1.1.248:1234/',
  body: iconv.encode('文字', 'gbk'),
  headers: {
    'Content-Type': 'text/plain;charset=GBK'
  }
}, (error, response, body) => {
  console.log(body)
})

