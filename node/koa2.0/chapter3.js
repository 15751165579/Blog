/**
 * koa中下文实现原理
 * 1、对于koa中context的实现，这里实际上你要理解原型链以及this 很好理解这一块内容
 * es5函数作用域 =》 es6块级作用域
 * 2、Object.create、new、apply、call以及bind实现
 * 3、使用的Delegates 就是原型链和this的结合使用
 * 4、什么是代理？为什么要大费周章的使用代理？代理的用法
 * 
 * - 单一职责
 * - 代理与本体接口的一致性 （1、 方便以后的替换）
 * - 虚拟代理 缓存函数，当真正需要用到的时候再调用，还不如合并http请求 图片预加载
 * - 缓存代理 缓存计算结果，缓存请求
 */

// 1、从koa的request 和 response文件中你可以发现，koa是通过get set方法动态的获取相关的扩展参数。其实你看到这里的源码会发现其中大部分调用this来属性
// 而在JS,this可是一个非常容易出错的属性，往下看

// 2、在前面也介绍了在node中提供了http.IncomingMessage 和 http.serverResponse让我们来扩展req和res。
// express框架中是这么做的，但是koa中并没有选择这么做

// 首选看Application中 构造函数中是将:

// this.context = Object.create(context);
// this.request = Object.create(request);
// this.response = Object.create(response);

// 然后就是createContext中一大堆设置：

// createContext(req, res) {
//   const context = Object.create(this.context);
//   const request = context.request = Object.create(this.request);
//   const response = context.response = Object.create(this.response);
//   context.app = request.app = response.app = this;
//   context.req = request.req = response.req = req;
//   context.res = request.res = response.res = res;
//   request.ctx = response.ctx = context;
//   request.response = response;
//   response.request = request;
//   context.originalUrl = request.originalUrl = req.url;
//   context.state = {};
//   return context;
// }

// 其实乍一看似乎明白什么意思 ，但是仔细深究其实问题还不少

// - Object.create
// - 这到底是个什么思路

// 3、context中的代理方法，其实这里很让人晕头转向，这里我们先抛开这些，自己来实现一个简单的例子 path
// __defineGetter__  __defineSetter__已经被废除  delegates 方式

// Object.create(obj) vs new Constructor()
// 它们都有继承的功能，但是吧 前者是直接继承obj, 而后者则是继承Contructor.prototype。
// 实现的原理

// function create (proto) {
//   if (typeof proto !== 'object' && typeof proto !== 'function') {
//     throw new Error('proto must be Object')
//   } else if (proto === null) {
//     throw new Error('ES5之前不支持')
//   }

//   function F () {}

//   F.prototype = proto

//   return new F()
// }

// new的实现

// function new (fn, ...args) {
//   const f = Object.create(fn.prototype)
//   const val = fn.apply(f, args)
//   return isPrimitive(val) ? f : val
// }

// create并不会执行对象或者是函数，而new是要通过apply执行构造函数的。

// new 执行步骤
// 1、 先创建一个对象 instance = new Object()
// 2、 设置原型 instance.__proto__ = Constructor.prototype
// 3、让F中的this指向instance,执行函数体 ，这里采用apply
// 4、如果是值类型，就返回instance。如果是引用类型则返回引用类型


// Function.prototype.call = function (context) {
//   var context = context || window;
//   context.fn = this;

//   var args = [];
//   for(var i = 1, len = arguments.length; i < len; i++) {
//       args.push('arguments[' + i + ']');
//   }

//   var result = eval('context.fn(' + args +')');

//   delete context.fn
//   return result;
// }


// Function.prototype.bind = function (context) {
//   context = Object(context) || window;
//   context.__fn__ = this;
//   let args = [...arguments].slice(1);
//   context.__result__ = function() {
//     let result_args = [...args, ...arguments];
//     context.__fn__(...result_args);
//   }
//   return context.__result__;
// }


// Function.prototype.apply = function (context, arr) {
//   var context = Object(context) || window;
//   context.fn = this;

//   var result;
//   if (!arr) {
//       result = context.fn();
//   }
//   else {
//       var args = [];
//       for (var i = 0, len = arr.length; i < len; i++) {
//           args.push('arr[' + i + ']');
//       }
//       result = eval('context.fn(' + args + ')')
//   }

//   delete context.fn
//   return result;
// }

// 2、代理的使用这里大家应该也很熟悉 这里主要可以通过两种方式实现 Object.defineProperty 和 proxy

const context = {
  request: {
    path: '/list'
  },
  name: 123
}

// Object.defineProperty(context, 'path', {
//   get () {
//     return this.request.path
//   }
// })

// 这样会在context上添加多余的属性

const newContext = new Proxy(context, {
  get (obj, prop) {
    if (prop in obj.request) {
      console.log('转发')
      return obj.request[prop]
    }
    console.log('正常')
    return obj[prop]
  }
})

console.log(newContext.request.path)
console.log(newContext.name)
console.log(newContext.path)

// 代理的一般模式

function Delegate (proto, target) {
  if (!(this instanceof Delegate)) {
    return new Delegate(proto, target)
  }
  this.proto = proto
  this.target = target
}

Delegate.prototype.method = function (name) {
  var target = this.target
  this.proto[name] = function () {
    return target[name].apply(target, arguments)
  }
}

const s1 = {}

const s2 = {
  name: 's2',
  say () {
    console.log(this.name)
  }
}

Delegate(s1, s2).method('say')

const sss = Object.create(s1)
sss.name = '123'

console.log(sss)

sss.say()
