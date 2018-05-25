/**
 * Proxy
 * 
 * get // 附加属性  特殊功能['1:2'] ['a.b.c']
 * 
 * - 私有属性改造 has construct
 * 
 * 
 * 
 * set ---- defineProperty中的set, get
 * 
 * deleteProperty ====》 configurable
 * 
 * ownKeys ==》 for in getOwnPropertySymbols ownKeys getOwnPropertyNames
 * 
 * 
 * defineProperty 
 * 
 * getPrototypeOf
 * 
 * setPrototypeOf 防止随意更改原型链
 * 
 */

/**
 * get的应用
 * 
 * 
 */
const person = {
  name: 'xiaoyun',
  province: '江苏省',
  city: '南京市'
}

const handle = {
  get (target, name) {
    switch (name) {
      case 'address':
        return target['province'] + target['city']
      default:
        return target[name]
    }
  }
}

const p1 = new Proxy(person, handle)

/**
 * 私有属性的
 */
const o1 = {
  [Symbol('name')]: '哈哈哈'
}

const handle1 = {
  ownKeys (target) {
    console.log(Object.getOwnPropertySymbols(target))
    return []
  }
}

// const op1 = new Proxy(o1, handle1)
const op1 = o1

// console.log(Object.getOwnPropertyNames(op1))
console.log(Object.getOwnPropertySymbols(op1))
console.log(Reflect.ownKeys(op1))

class Student {
  constructor () {
    this._ability = 90
    this.some = this._ability > 60 ? '合格' : '不合格'
  }
  get demo () {
    return '1'
  }
}

const handle2 = {
  get (target, name) {
    switch (name) {
      case '_ability':
        return '私有属性不允许访问'
      default:
        return target[name]
    }
  },
  has (target, propKey) {
    switch (propKey) {
      case '_ability':
        return false
      default:
        if (target[propKey] === undefined) {
          return false
        }
        return true
    }
  }
}

const Student1 = new Proxy(Student, {
  construct (target, args) {
    const s = new Student()
    return new Proxy(s, handle2)
  }
})
const s = new Student1()
console.log(s.some)
console.log(s._ability)
console.log(Reflect.has(s, '_ability'))
console.log(s.demo)


const arr = [1, 2, 3, 4, 5]

const handle3 = {
  get (target, name) {
    const indexs = name.split(':')
    return arr.slice(...indexs)
  }
}

const a1 = new Proxy(arr, handle3)

console.log(a1['1:3'])

// const o2 = new String('123')

// const handle4 = {
//   setPrototypeOf (target, proto) {
//     throw new Error('不可以修改它的原型')
//   }
// }

// const o3 = new Proxy(o2, handle4)

// o3.__proto__ = Object.prototype

// console.log(o3 instanceof String)

let name = null
const obj = {
}

Reflect.defineProperty(obj, 'name', {
  get () {
    console.log('自身属性的get')
    return name
  },
  set (value) {
    console.log('自身属性的set', value)
    name = value
  }
})

const obj1 = new Proxy(obj, {
  get (obj, propKey) {
    console.log('Proxy的get')
    // return obj[propKey]
    return ''
  },
  set (obj, prop, value) {
    console.log(' proxy的set')
    if (prop === 'name') {
      // return new Error(`${prop}不能被修改`)
      obj[prop] = 'proxy'
    }
  }
})

// obj1.name = 'xiaoyun'
console.log(obj1.name)

// Proxy的 set get 隔离了属性本身的get set 方法 ，如果你并没有在Proxy中的get、set调用元素本身的get, set那么相当于元素
// 自身的get set 将会被屏蔽


// 使用 setPrototypeOf 禁止部分非法的原型链更改

const str1 = new String('123')

const str = new Proxy(str1, {
  setPrototypeOf () {
    throw new Error('zzzzzz')
    // return false
  }
})

str.__proto__ = Object.prototype

console.log(str instanceof String)
