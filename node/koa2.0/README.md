> 剖析connect.js的中间件设计，利于我们更好的理解Koa2.0中间件设计原理。

### 一、前言

&nbsp;&nbsp;&nbsp;&nbsp;首先对于这两个框架最起码要看过文档或者是敲过入门的小demo，因为我们读源码并不只是为了装X，更重要的是帮助我们理解为什么要这样用？为什么这里会有坑？

&nbsp;&nbsp;&nbsp;&nbsp;回忆一下如何用Node创建http服务：

```JavaScript
    const http = require('http')
    const app = http.createServer((req, res) => {
        // 处理一个个http请求
        res.end('hello world')
    })
    
    app.listen(3000)
```

&nbsp;&nbsp;&nbsp;&nbsp;而这里对于如何优雅的处理每一次请求就成了一个值得思考的问题，而在connect.js中你可以这样处理：

```JavaScript
const http = require('http')
const connect = require('connect')
const app = connect()

app.use((req, res, next) => {
  // 中间件1
  next()
})

app.use((req, res, next) => {
  // 中间件2
  next()
})

app.use((re, res, next) => {
  // 中间件3
  // 响应结束
  res.end('hello world')
})

http.createServer(app).listen(3000)
```

### 二、connect中间件原理

&nbsp;&nbsp;&nbsp;&nbsp;理解connect中间件实现原理，我们需要从这四个方法入手:

- createServer： 如何定义处理请求方法？
- use: 怎样注册我们的中间件？
- handle: 中间件的执行流程是怎样的？
- call: 执行中间件方法需要注意什么？

##### 1、createServer

```
    function createServer() {
      function app(req, res, next){ app.handle(req, res, next); } 
      merge(app, proto);
      merge(app, EventEmitter.prototype); 
      app.route = '/'; 
      app.stack = []; 
      return app;
    }
```

&nbsp;&nbsp;&nbsp;&nbsp;createServer是connect的入口方法，它返回一个处理请求的方法，内部再调用handle来处理这些注册的中间件，也就是中间件的处理流程。

&nbsp;&nbsp;&nbsp;&nbsp;connect并没有采用构造函数的方式，而将需要用到的属性方法拷贝到app对象上使用，而对于Koa2.x中则是采用ES6的class实现。

&nbsp;&nbsp;&nbsp;&nbsp;这里的route是中间件的默认路由（这里的路由与我们理解的路由有所差别，后面会提到），stack主要用来存放中间件。

##### 2、use

```JavaScript
    function use(route, fn) {
      var handle = fn;
      var path = route;
    
      // 不传入route则默认为'/'，这种基本是框架处理参数的一种套路
      if (typeof route !== 'string') {
        handle = route;
        path = '/';
      }
    
      ...
      // 存储中间件
      this.stack.push({ route: path, handle: handle });
      
      // 以便链式调用
      return this;
    }
```

&nbsp;&nbsp;&nbsp;&nbsp;use方法中的核心就是将用户传入的参数整合成我们后续要用的layer对象包含路由和执行方法，并且将一个个layer对象存储在stack中，从这里我们可以猜测出中间件注册的顺序十分重要。

##### 3、handle与call

&nbsp;&nbsp;&nbsp;&nbsp;这里我们需要将handle与call结合起来理解，它们可以说是connect的灵魂。

```JavaScript
    function handle(req, res, out) {
      var index = 0;
      var stack = this.stack;
      ...
      function next(err) {
        ...
        // 依次取出中间件
        var layer = stack[index++]
    
        // 终止条件
        if (!layer) {
          defer(done, err);
          return;
        }
    
        var path = parseUrl(req).pathname || '/';
        var route = layer.route;
    
        // 路由匹配规则
        if (path.toLowerCase().substr(0, route.length) !== route.toLowerCase()) {
          return next(err);
        }
        ...
        call(layer.handle, route, err, req, res, next);
      }
    
      next();
    }
```

&nbsp;&nbsp;&nbsp;&nbsp;handle方法的关键点在于通过next方法依次检测当前中间件是否应该执行。而next方法中的路由匹配规则可以让我们清楚的明白这里并不是完全相等的匹配而是一种包含的关系：

```JavaScript
    app.use('/foo', (req, res, next) => next())
    app.use('/foo/bar', (req, res, next) => next())
```

&nbsp;&nbsp;&nbsp;&nbsp;所以当你访问/foo/bar路由时，这两个中间件都会执行。

&nbsp;&nbsp;&nbsp;&nbsp;如果不匹配当前中间件，那么会自动调用next方法将进行下一个中间件的检测。

&nbsp;&nbsp;&nbsp;&nbsp;当路由匹配无误，那么就会调用call方法来执行当前中间件的处理函数：

```JavaScript
    function call(handle, route, err, req, res, next) {
      var arity = handle.length;
      var error = err;
      var hasError = Boolean(err);
    
      try {
        if (hasError && arity === 4) {
          // 错误处理中间件
          handle(err, req, res, next);
          return;
        } else if (!hasError && arity < 4) {
          // 请求处理中间件
          handle(req, res, next);
          return;
        }
      } catch (e) {
        // 记录错误
        error = e;
      }
    
      // 将错误传递下去
      next(error);
    }
```

&nbsp;&nbsp;&nbsp;&nbsp;这里可以看到call内部通过调用try/catch捕获中间件错误，并且通过参数个数和有无错误来决定执行错误处理中间件还是请求处理中间件，其它的情况则是自动调用next方法去检查下一个中间件。如果try/catch捕获到错误之后，会一直将这个错误传递下去，直到遇到错误处理中间件。

&nbsp;&nbsp;&nbsp;&nbsp;所以这里我们可以发现这个handle是有点朴实的，它会一直去检查中间件数组直到数组遍历完或者是next调用链断掉（也就是你在中间件中没有手动调用next），这里我们可以通过流程图看一下hanle与call的处理过程：


![](https://user-gold-cdn.xitu.io/2018/7/19/164ae4b9519e43f4?w=860&h=785&f=png&s=59466)

##### 4、小结

&nbsp;&nbsp;&nbsp;&nbsp;这时我们可以发现connect的几个特点

- 当中间件发生错误时，handle函数并不是立即进入错误处理状态，而是将错误逐层传递，直到找到错误处理中间件，并且你的错误中间件必须是四个参数；
- 中间件的执行流程是通过next链接的；
- 我们需要手动调用res.end结束响应；
- 当我们使用ES8的async方法时，无法捕获到错误。


### 三、Koa2.0中间件

&nbsp;&nbsp;&nbsp;&nbsp;Koa2.0中间件的实现与connect中间件原理基本相似，主要区别就在于中间件执行流程上的细节处理。

&nbsp;&nbsp;&nbsp;&nbsp;首先我们要知道async函数返回的是一个Promise对象，所以当async内部发生错误，这个Promise对象就会将状态转换为reject。这也是为什么try/catch无法捕获它的状态，所以捕获async函数的内部错误，实际上就是Promise对象的错误处理,接下来我们看Koa2.0中next方法的实现：

```JavaScript
    function compose (middleware) {
      if (!Array.isArray(middleware)) throw new TypeError('Middleware stack must be an array!')
      for (const fn of middleware) {
        if (typeof fn !== 'function') throw new TypeError('Middleware must be composed of functions!')
      }
    
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
            return Promise.resolve(fn(context, dispatch.bind(null, i + 1)));
          } catch (err) {
            return Promise.reject(err)
          }
        }
      }
    }
```

&nbsp;&nbsp;&nbsp;&nbsp;从上述代码中可以看出Koa2.0中间件处理的流程比connect更加简单，首先Koa2.0中没有路由，无需在传递的过程中匹配路由。

&nbsp;&nbsp;&nbsp;&nbsp;而我们通过层层传递Promise对象，形成了一条Promise链，一旦出现reject状态，那么会立即进入catch方法，这也正好解决了connect中需要将错误层层传递到错误中间件的缺点。

&nbsp;&nbsp;&nbsp;&nbsp;而当我们调用next方法时，就是调用dispatch.bind(null, i + 1)，直白一点，就是:

```JavaScript
    function next () {
        return dispatch(i + 1)
    }
```
&nbsp;&nbsp;&nbsp;&nbsp;而对于这条Promise链，Koa2.0中最后这样处理：

```JavaScript
    fnMiddleware(ctx).then(handleResponse).catch(onerror)
```

&nbsp;&nbsp;&nbsp;&nbsp;通过handleResponse方法帮助我们自动调用res.end()，这就是为什么在Koa中我们这样设置返回值:

```JavaScript
    app.use(ctx => {
      ctx.body = 'Hello Koa'
    })
```

&nbsp;&nbsp;&nbsp;&nbsp;并且这里通过系统自带的onerror方法帮助我们处理错误，并且在onerror内部使用:

```JavaScript
    this.app.emit('error', err, this);
```

&nbsp;&nbsp;&nbsp;&nbsp;从而为用户提供监听error来集中处理错误的功能。


&nbsp;&nbsp;&nbsp;&nbsp;从connect到koa2.0，希望可以帮助你完全理解中间件的实现原理。

### 四、写在最后

&nbsp;&nbsp;&nbsp;&nbsp;这里可能有人不解，难道讲Koa都不提一下洋葱模型吗？其实看到这里，我相信你已经明白next的执行流程实际上就是一个函数递归执行的过程，这也就是为什么我们会用洋葱模型来形容它。

***

&nbsp;&nbsp;&nbsp;&nbsp;喜欢本文的小伙伴，可以[gay一下](https://github.com/15751165579/Blog/)或者关注我的订阅号，ε=ε=ε=(~￣▽￣)~

<div align=center><img src="https://user-gold-cdn.xitu.io/2018/7/18/164a948cd7fb96dd?w=258&h=258&f=jpeg&s=26776"/></div>

