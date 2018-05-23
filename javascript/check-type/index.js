// =====================
// Check Type
// =====================

// 1、typeof运算符
console.log(' =========== typeof =========== ')

console.log(typeof undefined)
console.log(typeof [])
console.log(typeof '123')

// 比较特殊的就是null

console.log('当使用typeof null: ', typeof null)

// typeof只能区别Primitive Value，而对于对象它是无能为力的

console.log('字符串字面量', typeof '123')
console.log('字符串对象', typeof new String('123'))

// Tip: 对于“JS中万物皆对象”这句话，你要知道这里的万物是不包括Primitive Value

// 2、instanceof运算符 
console.log(' =========== instanceof =========== ')
// 检查一个构造函数的原型是否存在一个对象的原型链上。

const s = new String('123')

console.log(s instanceof String)
console.log(s instanceof Object)

// 为了检查一下上面的定义，我们可以

s.__proto__ = Object.prototype

console.log(s instanceof String)
console.log(s instanceof Object)

// 通过instanceof我们可以判断我们自定义的对象

function Animal (name) {
  this.name = name
}

const fizz = new Animal('fizz')

console.log(fizz instanceof Animal)
console.log(fizz instanceof String)

// constructor属性
console.log(' =========== constructor =========== ')
console.log(fizz.constructor === Animal)

// 但是需要注意几个问题
// 1、construcor是可以被修改的 无解
// 2、constructor有时间需要我们手动添加 需要注意

function Rabbit (name) {
  Animal.call(this, name)
}

Rabbit.prototype = Object.create(Animal.prototype)

// 手动设置constructor
Rabbit.prototype.constructor = Rabbit

const rabbit = new Rabbit('🐰')

console.log(rabbit.constructor === Rabbit)

// 3、toString方法
console.log(' =========== toString =========== ')

function type (obj) {
  return Reflect.apply(Object.prototype.toString, obj, []).replace(/^\[object\s(\w+)\]$/, '$1').toLowerCase()
}

console.log(type(new String('123')))

// 基本上利用Object.toString 可以解决JS中内置的对象类型

// 但是面对我们自定义的对象，需要控制类型时，并没有很好的方法

// 随着ES6通过Symbol暴露一些内部API之后，这种情况可以得到改善。

Animal.prototype[Symbol.toStringTag] = 'Animal'
console.log('使用Symbol.toStringTag: ', type(rabbit))

// 当然你也可以皮一下😀
const o = {
  get [Symbol.toStringTag] () {
    return 'Array'
  }
}

console.log(type(o))

// 同样的 还有 Symbol.hasIntanceOf

class Student {
  static [Symbol.hasInstance] (instance) {
    return true
  }
}

console.log({} instanceof Student)

// 上面说这么多类型检测的问题

function test (decimal) {
  if (type(decimal) === 'number') {
    return decimal.toFixed(2)
  } else if (type(decimal) === 'string') {
    return parseFloat(decimal).toFixed(2)
  } else {
    return '0.00'
  }
}

console.log(test(28.39843))
console.log(test('323.2321321'))
// console.log(test('28.00'))

// 显然当这个函数的参数非常多的时候，你会需要写很多类型检查的代码。

// 当然在这个前端工具蓬勃发展的时代，我们可以有很多选择

// Flow.js Facebook出品 https://github.com/facebook/flow

// TypeScript  Microsoft出品 https://github.com/Microsoft/TypeScript
