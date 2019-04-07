// 可以作为对象的属性名

const obj = {
  [Symbol('name')]: 'name',
  age: 20
}
console.log(obj)

// 保证不会出现重名属性值的问题 解决魔术字符串的问题

const SIZE = {
  SMALL: Symbol(),
  Medium: Symbol(),
  Big: Symbol()
}

function print (sizeType) {
  switch (sizeType) {
    case SIZE.SMALL:
      console.log('最小的尺寸')
      break
    case SIZE.Medium:
      console.log('中级尺寸')
      break
    case sizeType.Big:
      console.log('最大号')
      break
  }
}

print(SIZE.Medium)

// 遍历的问题 
// 该属性不会出现在 for of 和 for in 中
// 并且也不会被 Object.keys() Object.getOwnPropertyNames() JSON.stringify() 返回

// Object.getOwnPropertySymbols() 获取

console.log(Object.getOwnPropertySymbols(obj))

console.log(Object.keys(obj))

console.log(Reflect.ownKeys(obj))

// Symbol.for() 注册全局的 Symbol

const s1 = Symbol.for('foo')
const s2 = Symbol.for('foo')
console.log(s1 === s2)

// 内置Symbol

// instanceof 运算符相关
class MyClass {
  [Symbol.hasInstance] (foo) {
    return foo instanceof Array
  }
}

console.log([1, 2, 3] instanceof new MyClass())

// toStringTag

class Student {
  get [Symbol.toStringTag] () {
    return 'Student'
  }
}

console.log(Object.prototype.toString.call(new Student()))

// Symbol.iterator

const arr = [1, 2, 3, 4, 5]

arr[Symbol.iterator] = function* () {
  for (let i = 0; i < arr.length; i += 2) {
    yield arr[i]
  }
}

for (let item of arr) {
  console.log(item)
}
// 元编程 操作目标是程序本身的行为特性的编程
// name 也算是元编程的一个方法
// new.target 在Class 中判断是父实例 还是 子实例