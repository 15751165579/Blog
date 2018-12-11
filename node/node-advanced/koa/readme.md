# NodeJS进阶系列：Koa源码解读

> Koa作为下一代Web开发框架，不仅让我们体验到了async/await语法带来同步方式书写异步代码的酸爽，而且本身简洁的特点，更加利于开发者结合业务本身进行扩展。

  本文从以下几个方面解读Koa源码：

  - 如何创建应用程序？
  - 如何扩展res和req？
  - 如何组织中间件？
  - 如何进行异常处理？

#### 一、如何创建应用程序？

  利用NodeJS可以很容易编写一个简单的应用程序：

```JavaScript
const http = require('http')

const server = http.createServer((req, res) => {
  // 每一次请求处理的方法
  console.log(req.url)
  res.writeHead(200, { 'Content-Type': 'text/plain' })
  res.end('Hello NodeJS')
})

server.listen(8080)
```

> 注意：当浏览器发送请求时，会附带请求/favicon.ico。

  而Koa在封装创建应用程序的方法中主要执行了以下流程：

  - 组织中间件（监听请求之前）
  - 生成context上下文对象
  - 执行中间件
  - 执行默认响应方法或者异常处理方法

```JavaScript
// application.js
listen(...args) {
  const server = http.createServer(this.callback());
  return server.listen(...args);
}

callback() {
  // 组织中间件
  const fn = compose(this.middleware);

  // 未监听异常处理，则采用默认的异常处理方法
  if (!this.listenerCount('error')) this.on('error', this.onerror);

  const handleRequest = (req, res) => {
    // 生成context上下文对象
    const ctx = this.createContext(req, res);
    return this.handleRequest(ctx, fn);
  };

  return handleRequest;
}

handleRequest(ctx, fnMiddleware) {
  const res = ctx.res;
  // 默认状态码为404
  res.statusCode = 404;
  // 中间件执行完毕之后 采用默认的 错误 与 成功 的处理方式
  const onerror = err => ctx.onerror(err);
  const handleResponse = () => respond(ctx);
  onFinished(res, onerror);
  return fnMiddleware(ctx).then(handleResponse).catch(onerror);
}
```

#### 二、如何扩展res和req？

  首先我们要知道NodeJS中的res和req是http.IncomingMessage和http.ServerResponse的实例，那么就可以在NodeJS中这样扩展req和res:

```JavaScript
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
```

  而Koa中则是自定义request和response对象，然后保持对res和req的引用，最后通过getter和setter方法实现扩展。

```JavaScript
// application.js
createContext(req, res) {
  const context = Object.create(this.context);
    const request = context.request = Object.create(this.request);
    const response = context.response = Object.create(this.response);
    context.app = request.app = response.app = this;
    context.req = request.req = response.req = req; // 保存原生req对象
    context.res = request.res = response.res = res; // 保存原生res对象
    request.ctx = response.ctx = context;
    request.response = response;
    response.request = request;
    context.originalUrl = request.originalUrl = req.url;
    context.state = {};
    // 最终返回完整的context上下文对象
    return context;
}
```

  所以在Koa中要区别这两组对象:

  - request、response: Koa扩展的对象
  - res、req: NodeJS原生对象

```JavaScript
// request.js
get header() {
  return this.req.headers;
},
set header(val) {
  this.req.headers = val;
},
```

  此时已经可以采用这样的方式访问header属性：

```JavaScript
  ctx.request.header
```

  但是为了方便开发者调用这些属性和方法，Koa将response和request中的属性和方法代理到context上。

  通过Object.defineProperty可以轻松的实现属性的代理：

```JavaScript
function access (proto, target, name) {
  Object.defineProperty(proto, name, {
    get () {
      return target[name]
    },
    set (value) {
      target[name] = value
    }
  })
}

access(context, request, 'header')
```

  而对于方法的代理，则需要注意this的指向：

```JavaScript
function method (proto, target, name) {
  proto[name] = function () {
    return target[name].apply(target, arguments)
  }
}
```

  上述就是属性代理和方法代理的核心代码，这基本算是一个常用的套路。


  代理这部分详细的源码，可以查看[node-delegates](https://github.com/tj/node-delegates/blob/master/index.js), 不过这个包时间久远，有一些老方法已经废除。

  在上述过程的源码中涉及到很多JavaScript的基础知识，例如：原型继承、this的指向。对于基础薄弱的同学，还需要先弄懂这些基础知识。

#### 三、如何组织中间件？

  首先需要通过下面的这张图了解中间件的执行流程：

![中间件执行流程](https://github.com/koajs/koa/blob/master/docs/middleware.gif)

  其中的app.use()方法主要用于注册需要用到的中间件：

```JavaScript
use(fn) {
  this.middleware.push(fn);
  return this;
}
```

  这里可以发现use方法是可以链式调用的。

  那么中间件执行的流程是什么呢？这时就需要查看koa-compose源码：

```JavaScript
function compose (middleware) {
  if (!Array.isArray(middleware)) throw new TypeError('Middleware stack must be an array!')
  for (const fn of middleware) {
    if (typeof fn !== 'function') throw new TypeError('Middleware must be composed of functions!')
  }

  /**
   * @param {Object} context
   * @return {Promise}
   * @api public
   */

  return function (context, next) {
    let index = -1
    return dispatch(0)
    function dispatch (i) {
      if (i <= index) return Promise.reject(new Error('next() called multiple times'))
      index = i
      let fn = middleware[i]
      if (i === middleware.length) fn = next
      if (!fn) return Promise.resolve()
      try {
        // 这里可以发现next实际上就是下一个中间件
        return Promise.resolve(fn(context, dispatch.bind(null, i + 1))); 
      } catch (err) {
        return Promise.reject(err)
      }
    }
  }
}
```

  从上述的源码中可以发现当注册中间件时，已经决定了中间件的执行顺序，并且调用next实际上就是调用下一个中间件方法，从而递归调用所有的中间件形成洋葱模型。

#### 四、如何进行异常处理？

  try catch 只能处理同步异常

  Koa框架中的异常处理

  对于同步方式编写异步代码的另一个好处 处理异常的自然

#### 五、总结

   





