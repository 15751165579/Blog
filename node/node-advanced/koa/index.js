const http = require('http')
const url = require('url')
const querystring = require('querystring')
Object.defineProperties(http.IncomingMessage.prototype, {
  query: {
    get () {
      return querystring.parse(url.parse(this.url).query)
    }
  }
})

Object.defineProperties(http.ServerResponse.prototype, {
  json: {
    value: function (obj) {
      if (typeof obj === 'object') {
        obj = JSON.stringify(obj)
      }
      this.end(obj)
    }
  }
})


const server = http.createServer((req, res) => {
  console.log(req.query) /
  res.json({message: 'Hello NodeJS'})
})

server.listen(8080)
