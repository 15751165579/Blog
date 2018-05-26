/**
 * Proxy
 * 
 * get // 虚拟属性(1)  特殊功能['1:2'](2) ['a.b.c'](3)
 * 
 * - 私有属性改造 has construct(4) ownKeys ==》 for in getOwnPropertySymbols ownKeys getOwnPropertyNames
 * 
 * 
 * 
 * set ---- defineProperty中的set, get 是方法 (5)
 * 
 * deleteProperty ====》 configurable
 * 
 * 
 * defineProperty 
 * 
 * getPrototypeOf
 * 
 * setPrototypeOf 防止随意更改原型链
 * 
 */

 // 虚拟属性

// const person = {
//   name: 'xiaoyun',
//   province: '江苏省',
//   city: '南京市'
// }

// const enhancePerson = new Proxy(person, {
//   get (target, name) {
//     switch (name) {
//       case 'address':
//         return `${target['province']}-${target['city']}`
//       default:
//         return target[name]
//     }
//   },
//   set (target, propKey, value) {

//   }
// })

// enhancePerson.city = '苏州市'
// console.log(enhancePerson)
// console.log(person)
// console.log(enhancePerson.city === person.city)

// console.log(enhancePerson.address)
// console.log(Object.keys(enhancePerson))


// get 对于数组的扩展
console.log(' ====== 数组的扩展 ====== ')
const arr = [1, 2, 3, 4, 5, 6, 7, 8]

const list = new Proxy(arr, {
  get (target, name) {
    if (name.includes(':')) {
      const indexs = name.split(':')
      return target.slice(indexs[0], indexs[1])
    }
    return target[name]
  }
})

console.log(list[1])
console.log(list['2:6'])


console.log(' ===== 对象的扩展 ====== ')
const obj = {
  a: {
    b: {
      c: 'xiaoyun'
    }
  }
}

const obj1 = new Proxy(obj, {
  get (target, name) {
    const keys = name.split('.')
    return keys.reduce((pre, next) => {
      if (pre !== null && pre !== undefined) {
        pre = pre[next]
      }
      return pre
    }, target)
  }
})
console.log(obj1['a.b.c']) // xiaoyun

// 私有属性
console.log('===== 私有属性 =====')
const demo = {
  [Symbol('foo')]: 'xiaoyun',
  name: '123'
}

Reflect.defineProperty(demo, 'age', {
  value: 20,
  configurable: true,
  writable: false,
  enumerable: false
})

console.log(Object.keys(demo))
console.log(Object.getOwnPropertySymbols(demo))
console.log(Object.getOwnPropertyNames(demo))
console.log(Reflect.ownKeys(demo))

const demo1 = new Proxy(demo, {
  ownKeys (target) {
    return ['name']
  }
})

console.log(Object.keys(demo1))
console.log(Object.getOwnPropertySymbols(demo1))
console.log(Object.getOwnPropertyNames(demo1))
console.log(Reflect.ownKeys(demo1))

// 第一种的补充

const person = {
  name: 'xiaoyun',
  province: '江苏省',
  city: '南京市',
  get address () {
    return `${this.province}-${this.city}`
  }
}

const enhancePerson = new Proxy(person, {
  ownKeys (target) {
    return Object.keys(target).filter(item => item !== 'address')
  }
})

console.log(enhancePerson.address) // 江苏省-南京市
console.log(Object.keys(enhancePerson)) // [ 'name', 'province', 'city' ]