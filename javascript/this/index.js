/* eslint-disable */

/**
 * this指向的五种情况
 * 
 * 作为对象的方法调用 (this指向调用的对象)
 * 函数调用 （非严格模式 this指向 window , 严格模式下 this 指向undefined）
 * 构造函数 this指向自身
 * call apply bind 指定this的指向
 * 箭头函数（绑定外部函数的this）词法this 与动态this区别很大 用apply无效
 */

// 第一道题目
// var length = 100

// function foo () {
//   console.log(this.length)
// }

// const obj = {
//   length: 10,
//   bar (fn) {
//     fn()
//     arguments[0]()
//   }
// }

// obj.bar(foo, 2)

// 第二道题
const obj = {
  name: 'local name',
  say () {
    return () => console.log(this.name)
  },
  some () {
    const that = this
    return function () {
      console.log(that.name)
    }
  }
}
const obj1 = {
  name: "other name"
}

obj.say()()
obj.say().call(obj1)
obj.some().call(obj1)


// new的实现
/**
 * 1、创建一个新的对象
 * 2、将构造函数的作用域赋值给新对象
 * 3、执行构造函数中的代码
 * 4、返回新对象
 */

function isPrimitive (val) {
  const type = typeof val
  return type === 'undefined' || type === 'null' || (type !== 'obejct' && type !== 'function')
}

function applyNew (constructor, ...data) {
  const o = {}
  o.__proto__ = constructor.prototype
  const val = constructor.apply(o, data)
  if (isPrimitive(val)) {
    return o
  }
  return val
}

// create
function applyCreate (proto) {
  function F () {}
  F.prototype = proto
  return new F()
}

// 实际上apply call的自定义都是通过调用栈确定this的方式实现 （作为方法调用）
Function.prototype.applyAction = function (ctx, arr) {
  ctx = ctx || window
  ctx.fn = this
  let result
  if (!arr) {
     result = ctx.fn()
  } else {
    let args = []
    for (let i = 0, max = arr.length; i < max; i++) {
      args.push(`arr[${i}]`)
    }
    result = eval(`ctx.fn(${args})`)
  }
  delete ctx.fn
  return result
}

// bind的实现

Function.prototype.bindAction = function (oThis) {
  if (typeof this !== 'function') {
    throw new Error('error')
  }
  const aArgs = Array.from(arguments).slice(1)
  const fToBind = this
  const fNOP = function () {}
  const fBound = function () {
    return fToBind.apply(this instanceof fNOP ? this : oThis, aArgs.concat(Array.from(arguments)))
  }
  // 维护原型
  if (this.prototype) {
    fNOP.prototype = this.prototype
  }
  fBound.prototype = new fNOP()
  return fBound
}

Function.prototype.bind = function (oThis, ...data) {
  if (typeof this !== 'function') {
    throw new Error('this is not a function')
  }
  const fn = this
  const F = function () {} 
  const FBound = function () {
    // 是否采用new关键字构造
    return fn.apply(this instanceof F ? this: oThis, data)
  }

  // 维护原型链
  if (this.prototype) {
    F.prototype = this.prototype
  }
  FBound.prototype = new F()
  return FBound
}


