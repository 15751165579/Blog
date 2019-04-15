// 四、数组的劫持

const arr = [1, 2, 3]

function hijackingArray (arr) {
  const methods = [
    'push',
    'pop',
    'shift',
    'unshift',
    'sort',
    'reverse',
    'splice'
  ]
  const arrayProto = Array.prototype
  const injackingPrototype = Object.create(arrayProto) // 原型

  methods.forEach(method => {
    const originArrayMethod = arrayProto[method]
    injackingPrototype[method] = function (...args) {
      console.log(`劫持原生的 ${method} 方法`)
      const result = originArrayMethod.apply(this, args)

      // 一、对于传入的参数同样要劫持
      let inserted
      switch (method) {
        case 'push':
        case 'unshift':
          inserted = args
          break
        case 'splice':
          inserted = args.slice(2)
          break
      }
      if (inserted) {
        // ob.observeArray(inserted)
        // 继续劫持
      }
      return result
    }
  })
  /**
   * 二、修改原型
   * 古老的 __proto__
   * 
   * ES6 setPrototypeOf
   */
  return Object.setPrototypeOf(arr, injackingPrototype)
}

hijackingArray(arr)


arr.push(4)
console.log(arr)
arr.unshift(0)
console.log(arr)
arr.sort()
console.log(arr.shift())