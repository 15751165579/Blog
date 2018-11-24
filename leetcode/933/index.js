const RecentCounter = function () {
  this.stack = []
}

RecentCounter.prototype.ping = function (t) {
  this.stack.push(t)
  let start = 0
  /* eslint-disable */
  while (true) {
    const item = this.stack[start]
    if (t - 3000 > item) {
      this.stack.shift()
    } else {
      return this.stack.length
    }
  }
}