# promise规范

  Promise 表示异步操作的最终结果，主要通过其 then 方法注册回调接受最终结果以及失败的原因。

  Promise 是具有 then 方法的函数或者对象，其行为满足本规范
  thenable 是定义 then 方法的对象或者函数
  value 任何合法的值
  exception 由 throw 以发的值
  reason 拒绝承诺的值


  状态 

              ----- fulfilled --> 必须返回一个值，不能更改
  pendding ---- 
              ----- rejected  --> 必须有一个拒绝的理由，不能够更改。


  
  三种状态 pendding | fulfilled (resolved) | rejected

  当处于 pedding 状态， 可以转移到 fulfilled (resolved) 状态 或者是 rejected 状态

  当处于上述二者状态时，则不可以被改变。

[Promise/A+](https://promisesaplus.com/)


```JavaScript
const promise = new Promise((resolve, reject) => {
  if (操作成功) {
    resolve(value)
  } else {
    reject(error)
  }
})

promise.then(value => {
  // success
}, error => {
  // error
})
```