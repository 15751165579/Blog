/** 
 * 思路
 * 
 * 1、通常前端中的断言
 * 2、Node中的断言
 * 3、一些优秀的断言库 assert（TDD）should (BDD) expect (BDD) chai提供这三种风格
 * 4、expect源码
 */

// 前端中的断言

// try {
//   const a = '1'
//   console.assert(typeof a === 'number', 'a should be Number')
// } catch (err) {
//   console.log(err)
// }

// // 例如Vuex使用的断言方法 便于我们在开发环境下的调试
// function assert (condition, msg) {
//   if (!condition) {
//     throw new Error(`[Vuex] ${msg}`)
//   }
// }

// assert(false, '这怎么能是false')

// 后端中的断言
const assert = require('assert')

// assert抛出的错误多是AssertionError的实例

// == assert assert.ok assert.equal assert.deepEqual
// != notEqual notDeepEqual
try {
  assert(false, '这个值应该是true') // assert.ok()
} catch(e) {
  console.log(e instanceof assert.AssertionError)
  const { actual, expected, operator } = e
  console.log(`实际值： ${actual}，期望值： ${expected}, 使用的运算符：${operator}`)
}

// deepStrictEqual
try {
  assert.deepStrictEqual(NaN, NaN)
} catch (e) {
  const { actual, expected, operator } = e
  console.log(`实际值： ${actual}，期望值： ${expected}, 使用的运算符：${operator}`)
}

// strictEqual
try {
  assert.strictEqual(NaN, NaN)
} catch (e) {
  const { actual, expected, operator } = e
  console.log(`实际值： ${actual}，期望值： ${expected}, 使用的运算符：${operator}`)
}
