# 玩转Koa -- 路由中间件原理解析

#### 一、前言

  &emsp;&emsp;Koa为了保持自身的简洁，并没有捆绑中间件。

  &emsp;&emsp;但在实际的开发中，我们需要和形形色色的中间件打交道，本文将要分析的便是经常用到的路由中间件 -- koa-router。

  &emsp;&emsp;如果你对Koa的原理还不了解的话，可以先查看[Koa原理解析](https://juejin.im/post/5c1631eff265da615f772b59)。

#### 二、koa-router概述

  &emsp;&emsp;koa-router的源码只有两个文件：router.js和layer.js，分别对应Router对象和Layer对象。

  &emsp;&emsp;Layer对象是对单个路由的管理，其中包含的信息有路由路径(path)、路由请求方法(method)和执行函数(middleware)，并且提供路由的验证以及params参数解析的方法。

  &emsp;&emsp;相比较Layer对象，Router对象则是对所有注册路由的统一处理，并且它的API是面向开发者的。

  &emsp;&emsp;接下来从以下几个方面全面解析koa-router的实现原理：

  - Layer对象的实现
  - 路由注册
  - 路由匹配
  - 路由执行流程
  - 其他

#### 三、Layer

  &emsp;&emsp;Layer对象主要是对单个路由的管理，是整个koa-router中最小的处理单元，后续模块的处理中都离不开Layer中的方法，这正是首先介绍Layer的重要原因。

```JavaScript
function Layer(path, methods, middleware, opts) {
  this.opts = opts || {};
  // 支持路由别名
  this.name = this.opts.name || null;
  this.methods = [];
  this.paramNames = [];
  // 将路由执行函数保存在stack中，支持输入多个处理函数
  this.stack = Array.isArray(middleware) ? middleware : [middleware];

  methods.forEach(function(method) {
    var l = this.methods.push(method.toUpperCase());
    if (this.methods[l-1] === 'GET') {
      this.methods.unshift('HEAD');
    }
  }, this);

  // 确保类型正确
  this.stack.forEach(function(fn) {
    var type = (typeof fn);
    if (type !== 'function') {
      throw new Error(
        methods.toString() + " `" + (this.opts.name || path) +"`: `middleware` "
        + "must be a function, not `" + type + "`"
      );
    }
  }, this);

  this.path = path;
  // 将路由路径转化为路由正则表达式，并且将params参数信息保存在paramNames数组中
  this.regexp = pathToRegExp(path, this.paramNames, this.opts);
};
```

  &emsp;&emsp;Layer构造函数主要用来初始化路由路径、路由请求方法数组、路由处理函数数组、路由路径的正则表达式以及params参数信息数组，其中主要采用[path-to-regexp](https://github.com/pillarjs/path-to-regexp)方法根据路径字符串生成正则表达式，通过该正则表达式，可以实现路由的匹配以及params参数的捕获：

```JavaScript
// 验证路由
Layer.prototype.match = function (path) {
  return this.regexp.test(path);
}

// 捕获params参数
Layer.prototype.captures = function (path) {
  if (this.opts.ignoreCaptures) return [];
  return path.match(this.regexp).slice(1);
}
```

  &emsp;&emsp;根据paramNames中的参数信息以及captrues方法，可以获取到当前路由params参数的键值对：

```JavaScript
Layer.prototype.params = function (path, captures, existingParams) {
  var params = existingParams || {};
  for (var len = captures.length, i=0; i<len; i++) {
    if (this.paramNames[i]) {
      var c = captures[i];
      params[this.paramNames[i].name] = c ? safeDecodeURIComponent(c) : c;
    }
  }
  return params;
};
```

  &emsp;&emsp;需要注意上述代码中的safeDecodeURIComponent，为了避免服务器收到不可预知的请求，对于任何用户输入的作为URI部分的内容都需要采用encodeURIComponent进行转义，否则当用户输入的内容中含有'&'、'='、'?'等字符时，会出现预料之外的情况。而当我们获取URL上的参数时，则需要通过decodeURIComponent进行解码，而decodeURIComponent只能解码由encodeURIComponent方法或者类似方法编码，如果编码方法不符合要求，decodeURIComponent则会抛出URIError，所以作者在这里对该方法进行了安全化的处理：

```JavaScript
function safeDecodeURIComponent(text) {
  try {
    return decodeURIComponent(text);
  } catch (e) {
    // 编码方式不符合要求，返回原字符串
    return text;
  }
}
```

  &emsp;&emsp;Layer还提供了对于单个param前置处理的方法：

```JavaScript
Layer.prototype.param = function (param, fn) {
  var stack = this.stack;
  var params = this.paramNames;
  var middleware = function (ctx, next) {
    return fn.call(this, ctx.params[param], ctx, next);
  };
  middleware.param = param;
  var names = params.map(function (p) {
    return p.name;
  });
  var x = names.indexOf(param);
  if (x > -1) {
    stack.some(function (fn, i) {
      if (!fn.param || names.indexOf(fn.param) > x) {
        // 将单个param前置处理函数插入正确的位置
        stack.splice(i, 0, middleware);
        return true; // 跳出循环
      }
    });
  }

  return this;
};
```

  &emsp;&emsp;上述代码中通过some方法寻找单个param处理函数的原因在于以下两点：

  - 保持param处理函数位于其他路由处理函数的前面；
  - 路由中存在多个param参数，需要保持param处理函数的前后顺序。

```JavaScript
Layer.prototype.setPrefix = function (prefix) {
  if (this.path) {
    this.path = prefix + this.path; // 拼接新的路由路径
    this.paramNames = [];
    // 根据新的路由路径字符串生成正则表达式
    this.regexp = pathToRegExp(this.path, this.paramNames, this.opts);
  }
  return this;
};
```
  &emsp;&emsp;Layer中的setPrefix方法用于设置路由路径的前缀，这对于路由模块化的管理非常的有用。

  &emsp;&emsp;最后，Layer还提供了根据路由生成url的方法，主要采用[path-to-regexp](https://github.com/pillarjs/path-to-regexp)的compile和parse对路由路径中的param进行替换，而在拼接query的环节，正如前面所说需要对键值对进行繁琐的encodeURIComponent操作，作者采用了[urijs](https://github.com/medialize/URI.js)提供的简洁api进行处理。

#### 四、路由注册

##### 1、Router构造函数

  &emsp;&emsp;首先看了解一下Router构造函数：

```JavaScript
function Router(opts) {
  if (!(this instanceof Router)) {
    // 限制必须采用new关键字
    return new Router(opts);
  }

  this.opts = opts || {};
  this.methods = this.opts.methods || [
    'HEAD',
    'OPTIONS',
    'GET',
    'PUT',
    'PATCH',
    'POST',
    'DELETE'
  ];

  this.params = {}; // 保存param前置处理函数
  this.stack = []; // 存储layer
};
```

  &emsp;&emsp;在构造函数中初始化的params和stack属性最为重要，前者用来保存param前置处理函数，后者用来保存实例化的Layer对象。

  &emsp;&emsp;而上述这两个属性与接下来要讲的路由注册也是息息相关。

  &emsp;&emsp;koa-router中提供两种方式注册路由：

  - 具体的HTTP动词，例如：router.get('/users', ctx => {})
  - 支持所有的HTTP动词，例如：router.all('/users', ctx => {})

##### 2、http METHODS

  &emsp;&emsp;源码中采用[methods](https://github.com/jshttp/methods/blob/master/index.js)模块获取HTTP标准方法名，该模块内部实现主要依赖于http模块：

```JavaScript
http.METHODS && http.METHODS.map(function lowerCaseMethod (method) {
  return method.toLowerCase()
})
```

##### 3、router.verb() and router.all()

  &emsp;&emsp;这两种注册路由的方式的内部实现基本类似，下面以router.verb()的源码为例：

```JavaScript
methods.forEach(function (method) {
  Router.prototype[method] = function (name, path, middleware) {
    var middleware;

    // 1、处理是否传入name参数
    // 2、middleware参数支持middleware1, middleware2...的形式
    if (typeof path === 'string' || path instanceof RegExp) {
      middleware = Array.prototype.slice.call(arguments, 2);
    } else {
      middleware = Array.prototype.slice.call(arguments, 1);
      path = name;
      name = null;
    }
    
    // 路由注册的核心处理逻辑
    this.register(path, [method], middleware, {
      name: name
    });

    return this;
  };
});
```

  &emsp;&emsp;该方法第一部分是对传入参数的处理，可能对于middleware参数的处理会让大家联想到ES6中的rest参数，但是rest参数与arguments其中一个致命的区别：

```s
  rest参数只包含那些没有对应形参的实参，而arguments则包含传给函数的所有实参。
```

  &emsp;&emsp;如果采用rest参数的方式，上述函数则必须要求开发者传入name参数。但是也可以将name和path参数整合成对象，再结合rest参数：

```JavaScript
Router.prototype[method] = function (options, ...middleware) {
  let { name, path } = options
  if (typeof options === 'string' || options instanceof RegExp) {
    path = options
    name = null
  }
  // ...
  return this;
};
```

  &emsp;&emsp;采用ES6的新特性，代码变得简洁多了。

  &emsp;&emsp;第二部分是register方法，传入的method形参就是router.verb()与router.all()的最大区别，在router.verb()中可以发现传入的method是单个方法，后者则是传入HTTP所有方法的数组，所以对于这两种注册方法的实现，本质上是没有区别的。

##### 4、register

```JavaScript
Router.prototype.register = function (path, methods, middleware, opts) {
  opts = opts || {};

  var router = this;
  var stack = this.stack;

  // 注册路由中间件时，允许path为数组
  if (Array.isArray(path)) {
    path.forEach(function (p) {
      router.register.call(router, p, methods, middleware, opts);
    });
    return this;
  }

  // 实例化Layer
  var route = new Layer(path, methods, middleware, {
    end: opts.end === false ? opts.end : true,
    name: opts.name,
    sensitive: opts.sensitive || this.opts.sensitive || false,
    strict: opts.strict || this.opts.strict || false,
    prefix: opts.prefix || this.opts.prefix || "",
    ignoreCaptures: opts.ignoreCaptures
  });

  // 设置前缀
  if (this.opts.prefix) {
    route.setPrefix(this.opts.prefix);
  }

  // 设置param前置处理函数
  Object.keys(this.params).forEach(function (param) {
    route.param(param, this.params[param]);
  }, this);

  stack.push(route);

  return route;
};

```

  &emsp;&emsp;register方法主要负责实例化Layer、更新路由前缀和前置param处理函数，这些操作在Layer中已经提及过，相信大家应该轻车熟路了。

##### 5、use

  &emsp;&emsp;熟悉Koa的同学都知道use是用来注册中间件的方法，相比较Koa中的全局中间件，koa-router的中间件则是路由级别的。

```JavaScript
Router.prototype.use = function () {
  var router = this;
  var middleware = Array.prototype.slice.call(arguments);
  var path;

  // 支持多路径在于中间件可能作用于多条路由路径
  if (Array.isArray(middleware[0]) && typeof middleware[0][0] === 'string') {
    middleware[0].forEach(function (p) {
      router.use.apply(router, [p].concat(middleware.slice(1)));
    });

    return this;
  }
  // 处理路由路径参数
  var hasPath = typeof middleware[0] === 'string';
  if (hasPath) {
    path = middleware.shift();
  }

  middleware.forEach(function (m) {
    // 嵌套路由
    if (m.router) {
      // 嵌套路由扁平化处理
      m.router.stack.forEach(function (nestedLayer) {
        // 更新嵌套之后的路由路径
        if (path) nestedLayer.setPrefix(path);
        // 更新挂载到父路由上的路由路径
        if (router.opts.prefix) nestedLayer.setPrefix(router.opts.prefix);

        router.stack.push(nestedLayer);
      }); 

      // 不要忘记将父路由上的param前置处理操作 更新到新路由上。
      if (router.params) {
        Object.keys(router.params).forEach(function (key) {
          m.router.param(key, router.params[key]);
        });
      }
    } else {
      // 路由级别中间件 创建一个没有method的Layer实例
      router.register(path || '(.*)', [], m, { end: false, ignoreCaptures: !hasPath });
    }
  });

  return this;
};
```

  &emsp;&emsp;koa-router中间件注册方法主要完成两种功能：

  - 将路由嵌套结构扁平化，其中涉及到路由路径的更新和param前置处理函数的插入；
  - 路由级别中间件通过注册一个没有method的Layer实例进行管理。

#### 五、路由匹配

```JavaScript
Router.prototype.match = function (path, method) {
  var layers = this.stack;
  var layer;
  var matched = {
    path: [],
    pathAndMethod: [],
    route: false
  };

  for (var len = layers.length, i = 0; i < len; i++) {
    layer = layers[i];
    if (layer.match(path)) {
      // 路由路径满足要求
      matched.path.push(layer);

      if (layer.methods.length === 0 || ~layer.methods.indexOf(method)) {
        // layer.methods.length === 0 该layer为路由级别中间件
        // ~layer.methods.indexOf(method) 路由请求方法也被匹配
        matched.pathAndMethod.push(layer);
        // 仅当路由路径和路由请求方法都被满足才算是路由被匹配
        if (layer.methods.length) matched.route = true;
      }
    }
  }
  return matched;
};
```

  &emsp;&emsp;match方法主要通过layer.match方法以及methods属性对layer进行筛选，返回的matched对象包含以下几个部分：

  - path: 保存所有路由路径被匹配的layer；
  - pathAndMethod: 在路由路径被匹配的前提下，保存路由级别中间件和路由请求方法被匹配的layer；
  - route: 仅当存在路由路径和路由请求方法都被匹配的layer，才能算是本次路由被匹配上。

  &emsp;&emsp;另外，在ES7之前，对于判断数组是否包含一个元素，都需要通过indexOf方法来实现， 而该方法返回元素的下标，这样就不得不通过与-1的比较得到布尔值：

```JavaScript
  if (layer.methods.indexOf(method) > -1) {
    ...
  }
```

  &emsp;&emsp;而作者巧妙地利用位运算省去了“讨厌的-1”，当然在ES7中可以愉快地使用includes方法：

```JavaScript
  if (layer.methods.includes(method)) {
    ...
  }
```

#### 六、路由执行流程

  &emsp;&emsp;理解koa-router中路由的概念以及路由注册的方式，接下来就是如何作为一个中间件在koa中执行。

  &emsp;&emsp;koa中注册koa-router中间件的方式：

```JavaScript
const Koa = require('koa');
const Router = require('koa-router');

const app = new Koa();
const router = new Router();

router.get('/', (ctx, next) => {
  // ctx.router available
});

app
  .use(router.routes())
  .use(router.allowedMethods());
```

  &emsp;&emsp;从代码中可以看出koa-router提供了两个中间件方法：routes和allowedMethods。

##### 1、allowedMethods()

```JavaScript
Router.prototype.allowedMethods = function (options) {
  options = options || {};
  var implemented = this.methods;

  return function allowedMethods(ctx, next) {
    return next().then(function() {
      var allowed = {};

      if (!ctx.status || ctx.status === 404) {
        ctx.matched.forEach(function (route) {
          route.methods.forEach(function (method) {
            allowed[method] = method;
          });
        });

        var allowedArr = Object.keys(allowed);

        if (!~implemented.indexOf(ctx.method)) {
          // 服务器不支持该方法的情况
          if (options.throw) {
            var notImplementedThrowable;
            if (typeof options.notImplemented === 'function') {
              notImplementedThrowable = options.notImplemented(); // set whatever the user returns from their function
            } else {
              notImplementedThrowable = new HttpError.NotImplemented();
            }
            throw notImplementedThrowable;
          } else {
            // 响应 501 Not Implemented
            ctx.status = 501;
            ctx.set('Allow', allowedArr.join(', '));
          }
        } else if (allowedArr.length) {
          if (ctx.method === 'OPTIONS') {
            // 获取服务器对改路由路径的方法支持
            ctx.status = 200;
            ctx.body = '';
            ctx.set('Allow', allowedArr.join(', '));
          } else if (!allowed[ctx.method]) {
            if (options.throw) {
              var notAllowedThrowable;
              if (typeof options.methodNotAllowed === 'function') {
                notAllowedThrowable = options.methodNotAllowed(); // set whatever the user returns from their function
              } else {
                notAllowedThrowable = new HttpError.MethodNotAllowed();
              }
              throw notAllowedThrowable;
            } else {
              // 响应 405 Method Not Allowed
              ctx.status = 405;
              ctx.set('Allow', allowedArr.join(', '));
            }
          }
        }
      }
    });
  };
};
```

  &emsp;&emsp;allowedMethods()中间件主要用于处理options请求，响应405和501状态。上述代码中的ctx.matched中保存的正是前面matched对象中的path（在routes方法中设置，后面会提到。），当matched对象中的path不为空时：

  - 服务器不支持当前请求方法，返回501状态码；
  - 当前请求方法为OPTIONS，返回200状态码；
  - path中的layer不支持该方法，返回405状态；
  - 对于上述三种情况，服务器都会设置Allow响应头，返回该路由路径上支持的请求方法。

##### 2、routes()

```JavaScript
Router.prototype.routes = Router.prototype.middleware = function () {
  var router = this;
  // 返回中间件处理函数
  var dispatch = function dispatch(ctx, next) {
    var path = router.opts.routerPath || ctx.routerPath || ctx.path;
    var matched = router.match(path, ctx.method);
    var layerChain, layer, i;

    // 【1】为后续的allowedMethods中间件准备
    if (ctx.matched) {
      ctx.matched.push.apply(ctx.matched, matched.path);
    } else {
      ctx.matched = matched.path;
    }

    ctx.router = router;

    // 未匹配路由 直接跳过
    if (!matched.route) return next();

    var matchedLayers = matched.pathAndMethod
    var mostSpecificLayer = matchedLayers[matchedLayers.length - 1]
    ctx._matchedRoute = mostSpecificLayer.path;
    if (mostSpecificLayer.name) {
      ctx._matchedRouteName = mostSpecificLayer.name;
    }
    layerChain = matchedLayers.reduce(function(memo, layer) {
      // 【3】路由的前置处理中间件 主要负责将params、路由别名以及捕获数组属性挂载在ctx上下文对象中。
      memo.push(function(ctx, next) {
        ctx.captures = layer.captures(path, ctx.captures);
        ctx.params = layer.params(path, ctx.captures, ctx.params);
        ctx.routerName = layer.name;
        return next();
      });
      return memo.concat(layer.stack);
    }, []);
    // 【4】利用koa中间件组织的方式，形成一个‘小洋葱’模型
    return compose(layerChain)(ctx, next);
  };

  // 【2】router属性用来use方法中区别路由级别中间件
  dispatch.router = this;
  return dispatch;
};
```

  &emsp;&emsp;routes中间件主要实现了四大功能。

  * 将matched对象的path属性挂载在ctx.matched上，提供给后续的allowedMethods中间件使用。（见代码中的【1】）

  * 将返回的dispatch函数设置router属性，以便在前面提到的Router.prototype.use方法中区别路由级别中间件和嵌套路由。（见代码中的【2】）

  * 插入一个新的路由前置处理中间件，将layer解析出来的params对象、路由别名已经捕获数组挂载在ctx上下文中，这种操作同理Koa在处理请求之前先构建context对象。（见代码中的【3】）

  * 而对于路由匹配到众多layer，koa-router通过koa-compose进行处理，这和[koa对于中间件处理的方式](https://juejin.im/post/5c1631eff265da615f772b59)一样的，所以koa-router完全就是一个小型洋葱模型。


#### 七、其他

  &emsp;&emsp;