// 四、数组的劫持

const methods = [
  'push',
  'pop',
  'shift',
  'unshift',
  'sort',
  'reverse',
  'splice'
]
console.log(methods)

const arr = [1, 2, 3]

// arr [[Prototype]] ----> Array.prototype

const arrayProto = Array.prototype

const injackingPrototype = Object.create(arrayProto)

injackingPrototype.prototype.push = function () {
  console.log('劫持原生的 push 方法')
  arrayProto.prototype.push.apply(this, arguments)
}

// arr [[Prototype]] ----> injackingPrototype

Object.setPrototypeOf(arr, injackingPrototype)


arr.push(4)