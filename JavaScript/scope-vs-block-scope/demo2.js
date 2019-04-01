/**
 * try / catch 实现块级作用域
 */

{
  try {
    throw 2
  } catch (a) {
    console.log(a)
  }
}
// console.log(a) // ReferenceError: a is not defined