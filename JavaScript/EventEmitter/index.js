function Event () {
  if (!(this instanceof Event)) {
    return new Event() // 确保用户采用new关键字创建对象
  }
  this.events = {} // 用于维护订阅事件的回调函数
}

Event.prototype.on = function (name, fn, ctx) {
  const events = this.events
  events[name] || (events[name] = [])
  events[name].push({
    fn,
    ctx
  })
  return this // 支持链式调用
}

Event.prototype.emit = function (name, ...data) {
  // 订阅者传递的参数 这里采用了ES6中的剩余参数， 在ES5中可以采用arguments
  const callbacks = this.events[name] || []
  for (let i = 0, max = callbacks.length; i < max; i++) {
    const { fn, ctx } = callbacks[i]
    fn.apply(ctx, data) // 绑定指定的this
  }

  return this
}

Event.prototype.once = function (name, fn, ctx) {
  const self = this
  function listener (...data) {
    self.remove(name, listener) // 销毁
    fn.apply(ctx, data)
  }
  listener._ = fn // 用于手动销毁
  return this.on(name, listener, ctx)
}

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