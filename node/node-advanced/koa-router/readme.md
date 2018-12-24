# 玩转Koa -- 路由中间件原理解析

#### 一、前言

  &emsp;&emsp;Koa为了保持自身的简洁，并没有捆绑中间件。

  &emsp;&emsp;但在实际的开发中，我们需要和形形色色的中间件打交道，本文将要分析的便是经常用到的路由中间件 -- koa-router。

  &emsp;&emsp;如果你对Koa的原理还不了解的话，可以先查看[Koa原理解析](https://juejin.im/post/5c1631eff265da615f772b59)。

#### 二、koa-router概述

  &emsp;&emsp;koa-router的源码只有两个文件：router.js和layer.js，分别对应Router对象和Layer对象。

  &emsp;&emsp;Layer对象是对单个路由的管理，其中包含的信息有路由的路径(path)、HTTP请求方法(method)和执行函数(middleware)，并且提供路由的验证以及params参数解析的方法。

  &emsp;&emsp;相比较Layer对象，Router对象则是对所有注册路由的统一处理，并且它的API是面向开发者的。

  &emsp;&emsp;接下来从以下几个方面全面解析koa-router的实现原理：

  - Layer对象的实现
  - 路由注册
  - 路由验证
  - 路由执行流程
  - 其他注意事项

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
  // 将路径字符串转化为路由正则表达式，并且将params参数信息保存在paramNames数组中
  this.regexp = pathToRegExp(path, this.paramNames, this.opts);
};
```

  &emsp;&emsp;Layer构造函数主要用来初始化路由的路径、HTTP请求方法数组、执行方法数组、路由的正则表达式以及params参数信息数组，其中主要采用[path-to-regexp](https://github.com/pillarjs/path-to-regexp)方法根据路径字符串生成正则表达式，通过该正则表达式，可以实现路由的匹配以及params参数的捕获：

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
    this.path = prefix + this.path; // 拼接新的路径
    this.paramNames = [];
    // 根据新的路径字符串生成正则表达式
    this.regexp = pathToRegExp(this.path, this.paramNames, this.opts);
  }
  return this;
};
```
  &emsp;&emsp;Layer中的setPrefix方法用于设置路径的前缀，这对于路由模块化的管理非常的有用。

  &emsp;&emsp;最后，Layer还提供了根据路由生成url的方法，主要采用[path-to-regexp](https://github.com/pillarjs/path-to-regexp)的compile和parse对路径中的param进行替换，而在拼接query的环节，正如前面所说需要对键值对进行繁琐的encodeURIComponent操作，作者采用了[urijs](https://github.com/medialize/URI.js)提供的简洁api进行处理。

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
