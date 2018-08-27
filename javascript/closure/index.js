function foo () {
  var a = 1
  function bar () {
    console.log(a) // 1
  }
  bar()
}
foo()
// 以上还不能算得上真正意义上的闭包，但是这种词法作用域的嵌套是闭包的基石

function foo1 () {
  var a = 2
  function bar1 () {
    console.log(a) // 2
  }
  return bar1
}
const bar2 = foo1()
bar2()

// 按照我们的期望foo1函数执行完成之后所形成的作用域应该直接销毁，然后由于bar2引用了内部的bar1，导致整个作用域被引用，而这个引用就叫做闭包

for (var i = 0; i < 5; i++) {
  setTimeout(function timer () {
    console.log(i) // 5
  }, 1000)
}

for (var j = 0; j < 5; j++) {
  (function (i) {
    setTimeout(function timer () {
      console.log(i)
    }, 1000)
  })(j)
  // 实际上这里就是为每个定时器创建一个专属的定义域用于保存相应时刻的j值。
}

var api = (function module (id) {
  function identify () {
    console.log(id)
  }

  var publicApi= {
    identify: identify
  }

  return publicApi
})('my module')

api.identify()

// 现代模块的机制
var MyModules = (function createModule () {
  var modules = {}

  function define (name, deps, func) {
    for (var i = 0, max = deps.length; i < max; i++) {
      deps[i] = modules[deps[i]]
    }
    modules[name] = func.apply(func, deps)
  }

  function get (name) {
    return modules[name]
  }
  return {
    define: define,
    get: get
  }
})()
/* eslint-disable */
MyModules.define('bar', [], function () {
  function say (message) {
    return 'say: ' + message
  }
  return {
    say: say
  }
})

MyModules.define('foo', ['bar'], function () {
  function hello () {
    return bar.say('foo dep bar')
  }
  return {
    hello: hello
  }
})

var bar = MyModules.get('bar')
var foo = MyModules.get('foo')

console.log(bar.say('bar'))
console.log(foo.hello())