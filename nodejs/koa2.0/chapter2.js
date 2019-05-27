/**
 * koa中间件的实现
 * 1、node中间件的始祖connect源码分析中间件的注册与执行
 * 2、connect中路由匹配以及next实现原理
 * 3、connect中call方法实现原理
 * 4、类比connect.js，koa中间件实现的差异性
 * 5、callback、handleRequest和 dispatch
 */
// const http = require('http')
// 当我们利用node创建一个服务器时

// const server = http.createServer((req, res) => {
//   // 通过requestListener函数处理各种请求
//   console.log(req, res)
// })

// server.listen(8080)

// 所以这里我们需要良好的代码组织方式，于是TJ大神提出的connect.js

// util-merge 完全可以用Object.assign

// 首先你要了解connect.js的基本用法

// const app = require('connect')()

// app.use((req, res, next) => {
//   some()
//   next()
// })



// app.use((req, res, next) => {
//   console.log(2)
//   next(new Error('1111'))
// })

// app.use((err, req, res, next) => {
//   if (err) {
//     console.log(err)
//   }
//   next()
// })

// app.use((req, res) => {
//   console.log(3)
//   res.end('hello world')
// })

// app.listen(8080)

// function some () {
//   throw new Error('1111')
// }

// 对于http.createServer的封装前面一节已经说过了，这里要着重讲解一下中间件的注册和执行

// 注册中间件

// use方法就是用来注册中间件的

// 1、
// if (typeof route !== 'string') {
//   handle = route;
//   path = '/';
// }

// 这也是一种套路，通过内部处理一些默认参数，让开发者提供更灵活的传参方式

// 2、
// if (path[path.length - 1] === '/') {
//   path = path.slice(0, -1);
// }

// 在URL中特别要注意/的处理

// 这个方法主要就是构造一个layer对象，这个layer存储中间件的路由以及处理方法。然后将这些layer存储在数组中。

// middleware1 => middlerware2 => middlerware3 .......

// 注册完之后，我们就要处理也就是内部的handle方法

// 首先在handle内部会通过finalhandler来定义一个http请求的最终处理方式。

// var done = out || finalhandler(req, res, {
//   env: env,
//   onerror: logerror
// });

// 然后这里又定义了一个next方法，这个next主要的作用就是检查当前中间件是否匹配（这里的匹配不是相等的意思）当前路由。
// 如果匹配的话执行中间件处理方法，如果不匹配的话则执行next，也就是检查下一个中间件，所以你会发现这是一个递归执行的过程，当然递归得有终止条件吧。


// var layer = stack[index++]; // 取出中间件

// if (!layer) { // 所有中间价多检查结束后，调用我们通过finalhandler注册的最终处理方法
//   defer(done, err);
//   return;
// }

// 前面我也说了路由匹配并不是按照完全相等的标准：

// var path = parseUrl(req).pathname || '/';
// var route = layer.route;
// if (path.toLowerCase().substr(0, route.length) !== route.toLowerCase()) {
//   return next(err);
// }


// 所以这里匹配的标准是当前访问的路由是不是在中间件的路由下。所以你在注册多级路由时，就需要特别注意这个问题。

// 例如 /list 和 /list/12 当你访问 /list/12 注册在/list上的中间件也会触发。

// 当路由匹配的话

// call(layer.handle, route, err, req, res, next);

// 通过call执行handler方法

// call的实现原理

// function call(handle, route, err, req, res, next) {
//   var arity = handle.length; // 获取中间件处理方法的参数个数，来判断是不是错误处理中间件
//   var error = err;
//   var hasError = Boolean(err); // 是否存在错误

//   debug('%s %s : %s', handle.name || '<anonymous>', route, req.originalUrl);

//   try {
//     if (hasError && arity === 4) {
//       // 执行错误处理中间件
//       handle(err, req, res, next);
//       return;
//     } else if (!hasError && arity < 4) {
//       // 执行请求处理中间件
//       handle(req, res, next);
//       return;
//     }
//   } catch (e) {
//     // replace the error
//     error = e;
//   }

//   // 继续检测中间件
//   next(error);
// }

// 从上述注释中你会发现其实call这里主要实现三个功能：
// 1、通过有无异常以及函数参数的个数来选择执行 错误处理中间件或者是请求处理中间件 ，所以当我们在注册中间件时，需要将控制权通过next递交给下一个中间件。
// 2、通过try catch 来捕获中间件执行时可能出现的错误，这里也有一个重要的问题，后面会具体说。
// 3、当中间件执行过程中出现错误之后，call会自动调用next方法将error层层传递，这时除了执行错误处理中间件，其它请求中间件多会被过滤掉。所以这里你基本也就会明白为什么错误处理中间件需要注册在尾部。

// 到这里基本上大家应该能够对于node中间件的原理有一个初步的理解。

// 实际上在connect.js并不是一个非常完整的框架，于是乎前辈们又基于connect.js搞了一个Express(不过Express4.0已经摆脱了connect.js), 而后来又推出了Koa。

// 虽然框架不同，但他们中间件的思想是一致，可能在实现上有一些不同。

// 现在我们要回到我们的主题koa的中间件实现，（后续还有一篇Express的实现原理）。

// 其实koa（这里koa的版本2.0）中间件与connect.js的中间件基本类似，下面我们来看看不同。

// 1、首先koa在use方法中只是将中间件存储在middleware中，

// use(fn) {
//   if (typeof fn !== 'function') throw new TypeError('middleware must be a function!');
//   if (isGeneratorFunction(fn)) { // 在async/await之前是采用generator + co
//     deprecate('Support for generators will be removed in v3. ' +
//               'See the documentation for examples of how to convert old middleware ' +
//               'https://github.com/koajs/koa/blob/master/docs/migration.md');
//     fn = convert(fn);
//   }
//   debug('use %s', fn._name || fn.name || '-');
//   this.middleware.push(fn); // 保存中间件
//   return this;
// }

// 2、koa通过向createServer中传入callback处理

// callback() {
//   const fn = compose(this.middleware); // 这里与我们之前在connect中的类似
//   if (!this.listenerCount('error')) this.on('error', this.onerror);

//   const handleRequest = (req, res) => {
//     const ctx = this.createContext(req, res); // 这里实际上设置koa中的context
//     return this.handleRequest(ctx, fn); // 后续处理中间件
//   };
//   return handleRequest;
// }

// 这里的callback基本上与connect.js中的handle一样的，唯二的区别就是koa中需要在处理一个http请求时，需要先将context设置好。
// 第二个区别就是compose的实现。前面我们提到在call中通过try catch捕获handler执行可能出现的错误是有缺陷的，因为对于async/await这样的异步方法，try/catch是无能为力的。
// koa中的dispatch和上面的next有异曲同工之妙，这里的dispatch里面就处理异步函数错误捕获的问题：

// function dispatch (i) {
//   if (i <= index) return Promise.reject(new Error('next() called multiple times'))
//   index = i
//   let fn = middleware[i] // 取出中间件
//   if (i === middleware.length) fn = next
//   if (!fn) return Promise.resolve() // 递归终止条件
//   try {
//     return Promise.resolve(fn(context, dispatch.bind(null, i + 1))); // 递归处理中间件
//   } catch (err) {
//     return Promise.reject(err) // 抛出错误
//   }
// }

// 在koa中并不自带路由功能，所以这里在执行中间件时并不需要处理路由。

// handleRequest(ctx, fnMiddleware) {
//   const res = ctx.res;
//   res.statusCode = 404;
//   const onerror = err => ctx.onerror(err); // 错误处理回调
//   const handleResponse = () => respond(ctx); // 结果返回回调，实际上就是调用res.end
//   onFinished(res, onerror);
//   return fnMiddleware(ctx).then(handleResponse).catch(onerror); // 这里通过前面dispatch返回的Promise来处理错误与响应的结果
// }

// 1、从handleResponse中你可以发现在koa中为什么不像connect.js那样需要手动调用res.end，而是给通过ctx.body赋值操作，实际上最后通过dispatch返回的Promise的then来对最后的结果处理，
// 就是在respond方法中处理context上的body，然后自动调用res.end。

// 2、相比较connect中next处理，在koa中的dispatch递归调用中，一旦发现错误直接reject,那么后面的中间件将不再执行，直接通过Promise的catch处理调用默认的onerror方法处理错误，所以在koa中并不存在错误处理中间件。
// 如果你看前面讲解koa如何创建服务器的文章，你也就知道为什么在koa的文档中会需要我们通过监听error事件来集中处理错误。

// 到此 基本上你对Node中间件思想以及koa中间件的实现有一个初步的认识了。

