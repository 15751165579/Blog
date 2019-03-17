### 前端小贴士 - 实现订阅发布模式

### 一、什么是发布订阅模式？

  &emsp;&emsp;发布订阅模式又叫观察者模式，它定义对象间的一种一对多的依赖关系，当一个对象（发布者）的状态发生改变时，所有依赖它的对象（订阅者）都将得到通知。

### 二、发布订阅模式的身影

  &emsp;&emsp;在前端的开发中，发布订阅模式无处不在：

  - addEventListener事件监听。
  - Vue框架的数据双向绑定（数据劫持 + 发布订阅模式）。
  - NodeJS中的EventEmitter模块。

### 三、实现

  &emsp;&emsp;JavaScript主要通过注册回调函数的方式实现发布订阅模式，核心点如下：

  - 创建一个对象来维护订阅事件中的回调函数。
  - on方法提供向订阅事件中注册回调函数的功能。
  - emit方法则是执行订阅事件中的回调函数。
  - once方法则是只触发一次订阅时间方法。
  - remove方法删除订阅事件中的回调函数。

```JavaScript
  function Event () {
    if (!(this instanceof Event)) {
      return new Event() // 确保用户采用构造函数的方式创建对象
    }
    this.events = {} // 用于维护订阅事件的回调函数
  }
```

  &emsp;&emsp;on方法的实现相对比较简单，主要给相应的订阅事件创建数组来保存订阅者的回调函数：

```JavaScript
  Event.prototype.on = function (name, fn, ctx) {
    const events = this.events
    events[name] || (events[name] = [])
    events[name].push({
      fn,
      ctx
    })
    return this // 支持链式调用
  }
```

  &emsp;&emsp;接下来就是emit方法，执行相应订阅事件中的回调函数，需要注意回调函数this的绑定以及传入参数的问题：

```JavaScript
  Event.prototype.emit = function (name, ...data) {
    // 发布者传递的参数 这里采用了ES6中的剩余参数， 在ES5中可以采用arguments
    const callbacks = this.events[name] || []
    for (let i = 0, max = callbacks.length; i < max; i++) {
      const { fn, ctx } = callbacks[i]
      fn.apply(ctx, data) // 绑定指定的this
    }

    return this
  }
```

  &emsp;&emsp;对于once方法，实际就是在执行相应订阅事件的回调函数的同时，将其注册的回调函数销毁掉，从而实现只通知一次的效果：

```JavaScript
  Event.prototype.once = function (name, fn, ctx) {
    const self = this
    function listener (...data) {
      self.remove(name, listener) // 自动销毁
      fn.apply(ctx, data)
    }
    listener._ = fn // 用于手动销毁
    return this.on(name, listener, ctx)
  }
```

  &emsp;&emsp;最后就是销毁的方法：

```JavaScript
  Event.prototype.remove = function (name, targetFn) {
    const callbacks = this.events[name] || []
    const liveCallbacks = []

    for (let i = 0, max = callbacks.length; i < max; i++) {
      const { fn } = callbacks[i]
      if (fn !== targetFn && targetFn !== fn._) {
        liveCallbacks.push(callbacks[i])
      }
    }

    if (liveCallbacks.length !== 0) {
      this.events[name] = liveCallbacks
      return this
    }
    delete this.events[name]
    return this
  }
```

### 四、总结

  &emsp;&emsp;优点：

  - 模块之间的解耦。
  - 异步编程中代替传入回调函数的方式。

  &emsp;&emsp;缺点：

  - 创建订阅者需要消耗一定的内存和时间。
  - 过度使用订阅发布模式，会使对象与对象之间的关系深埋背后，导致程序难以跟踪维护和理解。




