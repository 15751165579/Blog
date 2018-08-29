// 属性描述符

const obj = {}

Object.defineProperty(obj, 'name', {
  value: 'xiaoming',
  writable: false,
  configurable: true,
  enumerable: true
})

// 静默失败
obj.name = '1213213'

console.log(obj.name) // xiaoming

Object.defineProperty(obj, 'age', {
  value: 20,
  writable: true,
  configurable: false,
  enumerable: true
})

delete obj.age
console.log(obj.age)

try {
  Object.defineProperty(obj, 'age', {
    value: 18,
    writable: true,
    configurable: true, // true是不行的， 但是是false的话则可以
    enumerable: true
  })
} catch (e) {
  console.log(e)
}

// enumerable

Object.defineProperty(obj, 'foo', {
  value: 1,
  enumerable: false,
  writable: true,
  configurable: true
})

console.log(obj.propertyIsEnumerable('foo'))

Object.preventExtensions(obj) // 禁止扩展

Object.seal(obj)

// 让对象支持迭代器

const myobj = {
  a: 2,
  b: 3
}
// 迭代器主要就是next方法 next到最后才会done: true
Object.defineProperty(myobj, Symbol.iterator, {
  enumerable: false,
  writable: false,
  configurable: false,
  value: function () {
    var o = this
    var index = 0
    var keys = Object.keys(o)
    return { 
      next: function () {
        return {
          value: o[keys[index++]],
          done: (index > keys.length)
        }
      }
    }
  }
})

for (let v of myobj) {
  console.log(v)
}

