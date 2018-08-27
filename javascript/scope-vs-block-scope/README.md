# 作用域 VS 块级作用域

### 函数作用域

  函数作用域实际上就是隐藏自己的内部实现，拒绝外部访问，满足软件设计原则。

  这样一定程度上是可以规避命名冲突的。

  但是我们通常情况下声明的具名函数本身就污染了所在的作用域，这里我就要注意函数声明与函数表达式的区别：

  - 函数声明会将函数名绑定在当前的作用域中。
  - 函数表达式则是将函数名绑定在自身的函数中。

```JavaScript
  // 函数表达式
  var a = function bar () {}

  (function foo () {})()
```

  任何声明不是以function开头的均是函数表达式（当然不算async...）

### 匿名函数

  对于匿名函数的确定我们首先要明确:

  - 在函数调用栈中不会显示有意义的名字，这对于调试并不是一件好事。
  - 另外对于一个函数需要调用自身的话，只能通过arguments.callee，而这个API已经被废除。
  - 当然是较差的可读性。

  当然匿名函数也有应用的场景：

```JavaScript
  // IIFE
  (function () {
    var a = 'hello'
    console.log(a)
  })()

  // 
  [1, 2, 3, 4].forEach(item => console.log(item))
```

  对于IIEF的使用很多，你可以传入参数：

```JavaScript
  (function (global, undefined) {
    var a = 'hello'
    console.log(a)
  })(window)
```

  通过以上方式还可以防止undefined被篡改。

  IIFE还有一个重要的应用就是UMD模式:

```JavaScript
  !(function (foo) {
    global.foo = foo
  })(function foo () {
    console.log('foo')
  });

  global.foo()
```

### 块级作用域

  ES5之前得try/catch，ES6可以通过let、const 以及{}完成块级作用域。

  在没有的情况下，为什么那多for循环要把i变量声明在外部。

  块级作用域对于垃圾回收的影响：

```JavaScript
  function process () {
    // 处理数据
  }

  var bigData = {...}

  process(bigData)

  var btn = document.getElementById('btn')
  btn.addEventListener('click', function click () {
    console.log('click');
  })
```

  按照我们预期的情况，process方法调用后，bigData应该就会被回收,但是这里事件监听函数形成了一个覆盖作用域的闭包，所以bigData并不会被释放。

```JavaScript
  {
    var bigData = {...}
    process(bigData)
  }
```
  这样的话就会释放掉。