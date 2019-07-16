/**
 * Promise 的实现
 */
const PEDDING = 'pedding'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

function Promise(exector) {
  let self = this
  self.status = PEDDING
  self.value = undefined
  self.reason = undefined
  self.onFulfilledCallbacks = []
  self.onRejectedCallbacks = []

  function resolve(value) {
    if (value instanceof Promise) {
      return value.then(resolve, reject)
    }

    setTimeout(() => {
      if (self.status === PEDDING) {
        self.status = FULFILLED
        self.value = value
        self.onFulfilledCallbacks.forEach(cb => cb(self.value))
      }
    })
  }

  function reject(reason) {
    setTimeout(() => {
      if (self.status === PEDDING) {
        self.status = REJECTED
        self.reason = reason
        self.onRejectedCallbacks.forEach(cb => cb(self.reason))
      }
    })
  }

  try {
    exector(resolve, reject)
  } catch (e) {
    reject(e)
  }
}

Promise.prototype.then = function (onFulfilled, onRejected) {
  const self = this
  let newPromsie
  onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value
  onRejected = typeof onRejected === 'function' ? onRejected : reason => { throw reason }

  if (self.status === FULFILLED) {
    newPromsie = new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          const x = onFulfilled(self.value)
          resolve(x)
        } catch (e) {
          reject(e)
        }
      })
    })
    return newPromsie
  }

  if (self.status === REJECTED) {
    newPromsie = new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          const y = onRejected(self.reason)
          resolve(y)
        } catch (e) {
          reject(e)
        }
      })
    })
    return newPromsie
  }

  if (self.status === PEDDING) {
    newPromsie = new Promise((resolve, reject) => {
      self.onFulfilledCallbacks.push(value => {
        try {
          let x = onFulfilled(value)
          resolve(x)
        } catch (e) {
          reject(e)
        }
      })

      self.onRejectedCallbacks.push(reason => {
        try {
          let x = onRejected(reason)
          resolve(x)
        } catch (e) {
          reject(e)
        }
      })
    })

    return newPromsie
  }
}

Promise.prototype.all = function(promises) {
  return new Promise((resolve, reject) => {
    let done = gen(promises.length, resolve)
    promises.forEach((promise, index) => {
      promise.then(value => {
        done(index, value)
      }, reject)
    })
  })
}

function gen(length, resolve) {
  let count = 0
  let values = []
  return function(i, value) {
    values[i] = value
    if (++count === length) {
      resolve(values)
    }
  }
}

Promise.prototype.race = function(promises) {
  return new Promise((resolve, reject) => {
    promises.forEach(promise => promise.then(resolve, reject))
  })
}

Promise.prototype.catch = function(onRejected) {
  return this.then(null, onRejected)
}


Promise.prototype.resolve = function(value) {
  return new Promise(resolve => {
    resolve(value)
  })
}

Promise.prototype.reject = function(reason) {
  return new Promise((resolve, reject) => {
    reject(reason)
  })
}