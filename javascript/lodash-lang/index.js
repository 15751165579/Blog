/**
 * 函数参数
 */
const lodash = require('lodash')
// 对于函数参数的默认值 从古到今 应该有3中写法

// 一
function example1 (a) {
  a = a || 'default value'
}

// 这种写法 看起来挺帅， 但是也有一定的问题， 我们多知道js中转化为false的情况:

/**
 * undefined
 * null
 * false
 * 0 -0 NaN
 * ''
 */

// 所以这种方式可能存在误判的情况

// 二

function example2 (a = 'default value') {}

// ES6 中添加了函数默认值的语法 不过这种方式只是针对变量为undefined的情况下

// 一般情我们对于没有值的情况有两种 undefined null

// 三

function isDef (obj) {
  return (obj !== undefined && obj !== null)
}

/**
 * 
 * @param {string} a
 * @returns {string} 
 */
function example3 (a) {
  a = isDef(a) ? a : 'default value'
  return a
}

// 所以我们也可以这样写。vue lodash

// 当然仅仅对函数参数默认值的处理是远远不够的, 关键在于对于参数的类型检测

// 对于类型检测的方法， typeof , instanceof, tostring
function type (obj) {
  return Object.prototype.toString.call(obj).replace(/^\[object\s(\w+)\]$/g, '$1').toLowerCase()
}

// 结合Symbol.toStringTag为自定义对象设置类型 基本上大部分情况多能判断

// 虽然以上方法可以让我们知道对象的类型，但是对于一些对象你知道它的类型并没有什么用，例如Number

// 我们多知道number有 整数 小数 和 NaN之分

console.log('some' >>> 0) // 无符号取整

console.log(~~(NaN)) // 取整

console.log(isNaN(NaN))

// 一、gt gte lt lte 这四个函数

// 实现这种
function gt (value, other) {
  if (!(typeof value == 'string' && typeof other == 'string')) {
    value = +value
    other = +other
  }
  return value > other
}
// 这里通过使用+将字符串强制转化为数字类型，但是这里的操作感觉是多余了，因为在ES5中<的算法中，当两边不同为字符串时，会自动将字符串转化为数字

// > 最终多转化为< 进行操作 http://es5.github.io/#x11.8.5

// 二、toString 这里lodash对于undefined null array symbol number细化处理
const a = [1, 2, 3, 4, [5, 6, [7, 8]]]

console.log(a.join(','))
// -0 的问题 字符串转化的问题

function toStringNegativeZero (n) {
  return (1 / n === -Infinity) ? '-0' : '' + n
}
console.log(toStringNegativeZero(-0))

// 三、toSafeInteger 在JS中数字是有范围的 各种范围为MAX_SAFE_INTEGER 对于大数字 我们需要确保在安全范围内

// 四、toPlainObject  将一个对象上的属性以及原型上的属性收集起来

function Foo () {
  this.b = 'b'
}

Foo.prototype.c = 'c'

console.log(Object.assign({}, new Foo()))

console.log(Object.assign({}, lodash.toPlainObject(new Foo())))

// 五、toNumber 这里实际上和Number是差不多的

// toFinite 处理Infinity 和 NaN 的问题 利用NaN与自身不相等的特性

// toInteger 这里实现的很巧妙 通过对1取模的方式

// ~~  <<< 这两种也是很好的方法

// toArray转化为数组

const t = { 'a': 1, 'b': 2, c: {
  d: 3
} }
const t1 = 'abc'

// 类数组的转化 对象的转化

console.log(Array.from(t1))
console.log(Object.values(t))

// castArray 实际上就是通过Array.isArray()判断数组

console.log('' + -0)

console.log(parseInt('sds123sadsa'))

console.log(~~'sds123sadsa')
console.log(~~-23.78)

console.log(-20.89 >>> 0)

function some () {
  const a = Array.prototype.slice.call(arguments)
  const b = Array.from(arguments)
  const c = [...arguments]
  console.log(type(a))
  console.log(type(b))
  console.log(type(c))
}

some(1,2,3,4)