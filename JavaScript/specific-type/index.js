// typeof
console.log(typeof null)
console.log(typeof undefined)
console.log(typeof '1122')
console.log(typeof 1232)
console.log(typeof true)
console.log(typeof {})
console.log(typeof (function () {}))


// instanceof 判读该构造函数的 prototype 是否在该对象的原型链上

// 一般使用场景
console.log(' ==== instanceof ====')
function Student (name) {
  if (!(this instanceof Student)) {
    return new Student(name) // 强制使用构造函数的创建方式
  }
  this.name = name
}
const s1 = Student('xiaoming')
console.log(s1.name)

// 元编程中允许我们自定义 instanceof
class Teacher {
  constructor () {}
  static [Symbol.hasInstance] (instance) {
    console.log(instance)
    return false
  }
}

const t1 = new Teacher()
console.log(t1 instanceof Teacher)


console.log(' ==== toString ==== ')
function getTag (value) {
  if (value === null) {
    return 'Null'
  }
  if (value === undefined) {
    return 'Undefined'
  }
  return Object.prototype.toString.call(value).replace(/^\[object\s(\w+)\]$/, '$1')
}

console.log(getTag(undefined))
console.log(getTag(null))
console.log(getTag(new String('111')))
console.log(getTag([]))

// 元编程
class Foo {
  constructor () {}
  get [Symbol.toStringTag] () {
    return 'Foo'
  }
}
console.log(getTag(new Foo()))


// 灵活运用

// 判断引用类型
function isObject (value) {
  const type = typeof value
  return value != null && (type === 'object' || type === 'function')
}
console.log(isObject({}))
