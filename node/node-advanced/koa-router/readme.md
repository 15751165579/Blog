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
  - 路由的注册
  - 路由的验证
  - 路由的执行流程
  - 其他注意事项

#### 三、Layer

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


