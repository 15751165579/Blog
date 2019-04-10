const Promise = require('./core')

/**
 * Promsie
 * 
 * 需要检测
 * 1、构造函数的方式调用
 * 2、参数是否为函数
 * 
 * 记录的状态
 * 1、_state 当前 promise 的状态
 * 2、_value 返回的值
 * 3、_deferredState ？？？？
 * 4、_deferreds ？？？？
 * 
 * 执行传入的函数
 */

 /**
  * doResolve
  * 
  * 执行 传入的函数 
  * 通过 try / catch 捕获错误（此时为异步代码 则直接跳过）
  * 
  * 正常时，调用内部 resolve
  * 
  * 错误时，调用 reject
  */

/**
 * then
 * 
 * 返回一个新的 Promise 对象来支持链式调用
 * 
 * 生成 回调对象
 */

/**
 * handle 
 * 
 * 当前是 pendding 状态  则将回调对象保存在 _referreds 中
 * 否则 执行 ---> handleResolve
 */

/**
 * handleResolve
 * 
 * ？？？？？
 */

/**
 * resolve
 * 
 * 会判断 传入的 value
 * 
 * self._state = 1;
 * self._value = newValue;
 * 
 * 执行 handle
 * 
 * 并且 置空 _deferreds
 * 
 */

/**
 * reject
 * 
 * self._state = 2
 * self._value = reason
 * 
 * 执行 handle
 * 
 * 并且 置空 _deferreds
 */

new Promise((resolve) => {
  setTimeout(() => {
    resolve(1)
  }, 1000)
}).then(res => {
  console.log(res)
}, err => {
  console.log('捕获错误 ' + err)
}).then(res => {
  console.log('第二个then ' + res)
})