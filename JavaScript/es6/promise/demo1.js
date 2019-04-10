function Promise (constructor) {

  if (!(this instanceof Promise)) {
    return new Promise(constructor)
  }

  this.status = 'pendding' // 状态
  this.value = undefined // resolved 结果
  this.reason = undefined // rejected 理由

  const resolve = value => {
    if (this.status === 'pendding') {
      this.value = value
      this.status = 'resolved'
    }
  }

  const reject = reason => {
    if (this.status === 'pendding') {
      this.reason = reason
      this.status = 'rejected'
    }
  }

  try {
    constructor(resolve, reject)
  } catch (e) {
    reject(e)
  }
}

Promise.prototype = {
  then (onFulfilled, onRejected) {
    const { status, value, reason } = this
    switch (status) {
      case 'resolved':
        onFulfilled(value)
        break
      case 'rejected':
        onRejected(reason)
        break
      default:
    }
  }
}

