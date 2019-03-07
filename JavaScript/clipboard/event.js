function Event () {
  if (!(this instanceof Event)) {
    return new Event()
  }
  this.events = {}
}

Event.prototype = {
  on (name, fn, ctx) {
    const events = this.events
    events[name] || (events[name] = [])
    events[name].push({
      fn,
      ctx
    })
    return this
  },
  emit (name, ...data) {
    const events = this.events
    const callbacks = events[name] || []

    for (let i = 0; i < callbacks.length; i++) {
      const { fn, ctx } = callbacks[i]
      fn.apply(ctx, data) 
    }

    return this
  },
  once (name, fn, ctx) {
    const self = this
    function listener () {
      self.off(name, listener)
      fn.apply(ctx, arguments)
    }
    listener._ = fn
    return this.on(name, listener, ctx)
  },
  off (name, callback) {
    const events = this.events
    const callbacks = events[name] || []
    const liveCallbacks = []

    for (let i = 0; i < callbacks.length; i++) {
      const { fn } = callbacks[i]
      if (fn !== callback && fn._ !== callback) {
        liveCallbacks.push(callbacks[i])
      }
    }

    liveCallbacks.length ? (events[name] = liveCallbacks) : (delete events[name])

    return this
  }
}

const e = new Event()

function action1 (message) {
  console.log(`第一次触发 ${message}`)
}

function action2 (message) {
  console.log(`第二次触发 ${message}`)
}

e.on('some', action1)

e.on('some', action2)

e.emit('some', '咦嘻嘻')

e.off('some', action1)

e.emit('some', '咦嘻嘻')

e.once('once', action1)

e.emit('once', '这是一次性订阅')
e.emit('once', '这是一次性订阅')