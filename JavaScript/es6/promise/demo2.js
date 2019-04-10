// Promise.prototype.then(onFulfilled, onRejected)

// Promise.prototype.catch(undefined, onRejected)

// Promise.prototype.finally(callback) 回调函数没有任何参数 意味着不能只知道前面两种状态的具体情况

// Promise.all([p1, p2, p3])

// 当 p1, p2, p3 都为 fulfilled 状态 ，p才为 fulfilled 状态
// 只要 p1 p2 p3 中有一个为 rejected 状态， 那么 p 就为 rejected 状态


// Promise.race([p1, p2, p3]) 由最快的那个状态决定

// Promise.resolve() 将对象转化为 Promise

// Promise.reject() 返回一个 Promise 对象 ，将该对象的状态置为 rejected

function isObject (o) {
  const type = typeof o
  return o !== null && (type === 'object' || type === 'function')
}

function isThenable (o) {
  if (isObject(o) && typeof o.then === 'function') {
    return true
  }
  return false
}
console.log(isThenable)

// ES6 规定 Promise 任务加入到 job queues
// micro-task --> job queues
// macro-task --> task queues

// asap
function asyncFn () {
  if (typeof process === 'object' && process !== null && typeof (process.nextTick) === 'function') {
    return process.nextTick
  } else if (typeof setImmediate === 'function') {
    return setImmediate
  }
  return setTimeout
}

const PEDDING = Symbol('pedding')
const FULFILLED = Symbol('fulfilled')
const REJECTED = Symbol('rejected')

function Promise (fn) {
  if (!(this instanceof Promise)) {
    return new Promise(fn)
  }
  if (typeof fn !== 'function') {
    throw new Error('fn is must be function')
  }
  this._state = PEDDING
  this._value = null
  this._deferredState = PEDDING // ????
  this._deferreds = [] // 回调数组 then 方法可以被同一个 Promise 注册多次

  doResolve(fn, this)
}

Promise.prototype.then = function (onFulfilled, onRejected) {
  const res = new Promise(function () {}) // 其返回结果必须为 Promise， 为什么要返回新的 Promise 主要是状态不可变问题
  const handler = new Handler(onFulfilled, onRejected, res)

  // 当前是 PEDDING 状态

  handleResolved(this, handler)
  return res
}

function handleResolved (self, { onFulfilled, onRejected, promise}) {
  asyncFn(() => {
    const cb = self._state === FULFILLED ? onFulfilled : onRejected
    if (cb === null) {
      // 未指定回调函数情况，系统设置
      if (self._state === FULFILLED) {
        resolve(promise, self._value)
      } else {
        reject(promise, self._value)
      }
      return
    }

    try {
      const ret = cb(self._value)
      resolve(promise, ret)
    } catch (e) {
      reject(promise, e)
    }
  })
}

/**
 * 对于 传入的 onResolved onRejected 进行处理
 */
function Handler (onResolved, onRejected, promise) {
  this.onResolved = typeof onResolved === 'function' ? onResolved : null
  this.onRejected = typeof onRejected === 'function' ? onRejected : null
  this.promise = promise
}

/**
 * 
 * 确保  onResolved onRejected 只调用一次
 */
function doResolve (fn, promise) {
  let done = false
  try {
    fn(value => {
      if (done) {
        return
      }
      done = true
      resolve(promise, value)
    }, reason => {
      if (done) {
        return
      }
      done = true
      reject(promise, reason)
    })
  } catch (e) {
    done = true
    reject(promise, e)
  }
}

function resolve (self, value) {
  self._state = FULFILLED
  self._value = value

  // 执行 then 中注册的回调
}

function reject (self, reason) {
  self._state = REJECTED
  self._value = reason

  // 执行 Deferreds 中的 onRejected 回调
}
