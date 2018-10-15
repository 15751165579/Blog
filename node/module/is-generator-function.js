// https://github.com/ljharb/is-generator-function/blob/master/index.js
/*
  如何判断一个对象为generator函数
  1、我们可以通过typeof 判断一个对象会否为函数
  2、对于generator的特殊性写法，我们可以通过正则来判断是否符合格式
  3、通过JS中判断类型的toString方法
  4、如何针对Symbol.toStringTag的修改带来的伪造
  5、通过原型判断
*/

// 首先判断一个函数我们可以采用 typeof
function bar () {
  return 1
}

console.log(typeof bar === 'function')

// 通过*号的特征判断

function * foo () {
  yield 1
}

console.log(/^function\*/g.test(Function.prototype.toString.call(foo)))

// 然后在JS中判断类型，我们可以通过Object原型上的toString获取到它的tag

function type (obj) {
  return Object.prototype.toString.call(obj).replace(/^\[object\s(\w+)\]$/g, '$1').toLowerCase()
}

console.log(type(foo))

// 但是这里有个问题 在ES6中 存在Symbol可以修改这里得到的结果例如:

const hasStringTag = typeof Symbol === 'function' && typeof Symbol.toStringTag === 'symbol'

console.log(hasStringTag)

const boo = {
  get [Symbol.toStringTag] () {
    return 'generatorfunction'
  }
}

console.log(type(boo))

// 所以这里有采用了通过原型来判断

const getProto = Object.getPrototypeOf

console.log(getProto(foo) === getProto(Function('return function*() {}')()))