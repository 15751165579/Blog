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

Animal.prototype.toString = function () {
  return 'Animal'
}

const rabbit = new Animal('🐰')

console.log(rabbit instanceof Animal)
console.log(rabbit instanceof String)

// 实际上这里我也可以尝试使用constructor去判断
console.log(rabbit.constructor === Animal)

// 但是需要注意几个问题
// 1、construcor是可以被修改的 无解
// 2、constructor有时间需要我们手动添加 需要注意

function Rabbit (name) {
  Animal.call(this, name)
}

Rabbit.prototype = Object.create(Animal.prototype)

// 手动设置constructor
// Rabbit.prototype.constructor = Rabbit

const rabbit1 = new Rabbit('🐰')

console.log(rabbit1.constructor)

// 3、toString方法


function type (obj) {
  return Reflect.apply(Object.prototype.toString, obj, []).replace(/^\[object\s(\w+)\]$/, '$1').toLowerCase()
}

console.log(type(new String('123')))

// 基本上利用Object.toString 可以解决JS中内置的对象类型

// 但是面对我们自定义的对象，需要控制类型时，并没有很好的方法

// es6 Symbol

class Car {
  constructor (name) {
    this.name = name
  }
  get [Symbol.toStringTag] () {
    return 'Car'
  }
}

class BMW extends Car {
  constructor (name) {
    super(name)
  }
  static [Symbol.hasInstance] (instance) {
    return instance.name === '1'
  }
  get [Symbol.toStringTag] () {
    return 'Car'
  }
}

const car = new Car('1')
const bmw = new BMW('2')

console.log(type(car))

console.log(type(bmw))

console.log(type(null))

console.log(null instanceof Object)









