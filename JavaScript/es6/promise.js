// Promise.prototype.then(onFulfilled, onRejected)

// Promise.prototype.catch(undefined, onRejected)

// Promise.prototype.finally(callback) 回调函数没有任何参数 意味着不能只知道前面两种状态的具体情况

// Promise.all([p1, p2, p3])

// 当 p1, p2, p3 都为 fulfilled 状态 ，p才为 fulfilled 状态
// 只要 p1 p2 p3 中有一个为 rejected 状态， 那么 p 就为 rejected 状态


// Promise.race([p1, p2, p3]) 由最快的那个状态决定

// Promise.resolve() 将对象转化为 Promise

// Promise.reject() 返回一个 Promise 对象 ，将该对象的状态置为 rejected