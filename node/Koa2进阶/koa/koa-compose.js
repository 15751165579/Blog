/**
 * 一、中间件是如何组织的？也就是为什么在中间件中需要调用next
 * 二、如何捕获错误的
 * 三、并不是一个中间件执行完再执行第二个中间件
 * 
 * try catch 不能捕获异步操作的错误，这通过构建Promise，从而通过catch方法捕获异常
 * 
 */
/* eslint-disable */
function compose (middleware) {
  if (!Array.isArray(middleware)) { 
    throw new TypeError('middleware must be an array')
  }
  for (let fn of middleware) {
    if (typeof fn !== 'function') {
      throw new TypeError('middleware must be composed of functions')
    }
  }

  return function (context, next) {
    let index = -1
    return dispatch(0)
    function dispatch (i) {
      index = i
      let fn = middleware[i]
      if (i === middleware.length) {
        fn = next
      }
      if (!fn) {
        return Promise.resolve()
      }
      return Promise.resolve(fn(context, dispatch.bind(null, i + 1)))
    }
  }
}

function some (ctx, next) {
  console.log('111')
  next()
  console.log('2')
}
async function foo (ctx, next) {
  console.log('222')
  await next()
}
async function bar (ctx, next) {
  console.log('333')
  await next()
}

const fn = compose([
  some,
  foo,
  bar
])

fn().then(res => {
  console.log('执行完成 ' + res)
}).catch(err => {
  console.log('错误 ' + err)
})