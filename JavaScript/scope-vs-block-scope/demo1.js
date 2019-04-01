/**
 * 动态改变词法作用域
 */
var a = 1
function foo (str) {
  eval(str)
  console.log(a)
}

foo('var a = 2;')

// const obj = {
//   name: 'xiaoming',
//   age: 20
// }
// with (obj) {
//   name = 'xiaohua'
//   age = 18
// }
// console.log(obj) // { name: 'xiaohua', age: 18 }