/**
 * 从如何创建一个服务器开始
 * 
 * - Node创建一个服务器的过程
 * - 如何扩展 req , res
 * - Koa创建服务器的源码解析，以及为什么要继承events
 */
// 首先回顾一个如何用Node创建一个服务器
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
  console.log(req instanceof http.IncomingMessage)
  console.log(res instanceof http.ServerResponse)
  console.log(req.query)
  // res.end('hello world')
  res.json({
    msg: '1111'
  })
})

server.listen(8080)

// 看一下koa源码是如何创建服务器

// const Koa = require('koa')
// const app = new Koa()
// app.listen(...)

// 1、首先通过new关键字创建，那么它必须是一个构造函数，从源码中我们可以看到：

// class Application extends Emitter {
//   ....
// }

// 2、我们可以看到Application 继承了Emitter ， 而它的作用主要是通过内部emit('error')来触发我们的错误处理，所以在Koa的文档中你会看到这样处理错误

// app.on('error', err => {
//   log.error('server error', err)
// });

// listen(...args) {
//   debug('listen');
//   const server = http.createServer(this.callback());
//   return server.listen(...args);
// }

// 3、可以看到Koa这里通过对http.createServer的封装，暴露一个listen方法供我们使用



