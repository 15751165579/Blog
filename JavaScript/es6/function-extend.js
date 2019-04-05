// 函数默认值

// 本质是 判断 undefined
function demo (a = 1) {
  console.log(a)
}

demo(undefined)

// es6 之前的处理方法 逻辑或的方式 但是会造成误杀的情况

function demo1 (a) {
  a = a || 1
  console.log(a)
}

demo1(0)

// rest 参数 ...变量名 重要的是直接得到了数组
// ES6之前需要处理 arguments 

// 箭头函数 没有arguments 也没有this

// 尾调用

// 最后一步调用另一个函数
//
// function f(x) {
//   return g(x)
// }
// 下面这种也是
// function f (x) {
//   if (x > 0) {
//     return g(x)
//   }
//   return m(x)
// }

// 尾调用 减少调用栈的生成 从而节省内存

// 尾递归 所以不会发生调用栈溢出的问题


