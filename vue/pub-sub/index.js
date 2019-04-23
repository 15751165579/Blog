class PubSub {
  constructor () {
    this.themes = {}
  }
  on (name, fn) {
    const themes = this.themes
    themes[name] || (themes[name] = [])
    themes[name].push(fn)
    return this
  }
  emit (name, ...args) {
    const subs = this.themes[name] || []

    for (let i = 0, max = subs.length; i < max; i++) {
      subs[i](...args)
    }
    return this
  }
  once (name, fn) {
    const _listener = (...args) => {
      this.remove(name, _listener)
      fn(...args)
    }
    _listener.__fn__ = fn
    this.on(name, _listener)
  }
  remove (name, targetFn) {
    const subs     = this.themes[name]
    const liveSubs = []

    for (let i = 0, max = subs.length; i < max; i++) {
      const fn = subs[i]
      if (fn !== targetFn && fn.__fn__ !== targetFn) {
        liveSubs.push(fn)
      }
    }

    if (liveSubs.length !== 0) {
      this.themes[name] = liveSubs
      return this
    }

    delete this.themes[name]
    return this
  }
}

const pb = new PubSub()

function foo (message) {
  console.log(`foo 接收到了消息：${message}`)
}

function bar (message) {
  console.log(`bar 接收到了消息：${message}`)
}

function boo (message) {
  console.log(`boo 接收到了消息：${message}`)
}

pb.on('theme', foo)
pb.once('theme', bar)
pb.on('theme', boo)

console.log(' **** 第一次通知 ****')
pb.emit('theme', '早上10点的新闻')

console.log(' **** 第二次通知 ****')
pb.emit('theme', '下午5点的新闻')

pb.remove('theme', foo)
console.log(' **** 第三次通知 **** ')
pb.emit('theme', '晚上10点的新闻')
