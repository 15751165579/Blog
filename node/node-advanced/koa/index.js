// const http = require('http')
// const url = require('url')
// const querystring = require('querystring')
// Object.defineProperties(http.IncomingMessage.prototype, {
//   query: {
//     get () {
//       return querystring.parse(url.parse(this.url).query)
//     }
//   }
// })

// Object.defineProperties(http.ServerResponse.prototype, {
//   json: {
//     value: function (obj) {
//       if (typeof obj === 'object') {
//         obj = JSON.stringify(obj)
//       }
//       this.end(obj)
//     }
//   }
// })


// const server = http.createServer((req, res) => {
//   console.log(req.query) /
//   res.json({message: 'Hello NodeJS'})
// })

// server.listen(8080)

const app = require('connect')()

app.use(async (req, res, next) => {
  console.log('111')
  const s = await sleep(2000)
  console.log(s)
  await next()
})

app.use(async (req, res, next) => {
  console.log('222')
  await sleep(3000)
  await next()
  console.log('3333')
})

app.use((req, res) => {
  res.end('1111')
})

app.listen(8080)

function sleep (ms) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(ms)
    }, ms)
  })
}
