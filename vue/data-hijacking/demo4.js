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


methods.forEach(method => {
  injackingPrototype[method] = function () {
    console.log(`劫持原生的 ${method} 方法`)
    return arrayProto[method].apply(this, arguments)
  }
})

// arr [[Prototype]] ----> injackingPrototype

Object.setPrototypeOf(arr, injackingPrototype)


arr.push(4)
console.log(arr)
arr.unshift(0)
console.log(arr)
arr.sort()
console.log(arr)