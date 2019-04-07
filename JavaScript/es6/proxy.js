// 在目标之间架设一层“拦截”，外界对该对象的访问，都必须先通过这层拦截，因此可以进行过滤和改写

// 实现 filter 的效果

const obj = {
  name: '布兰登'
}

const handler = {
  get (target, property) {
    if (property === 'name') {
      return '小名：' + target[property]
    } else {
      return '不详'
    }
  }
}

const objProxy = new Proxy(obj, handler)

console.log(objProxy.name)
console.log(objProxy.age)

// 可以拦截的API 与 Reflect 一一对应

// 可取消代理

const demo = Proxy.revocable(obj, handler)

const demoProxy = demo.proxy

console.log(demoProxy.age)

demo.revoke()

// console.log(demoProxy.age)


// 防止原型链的影响

const obj1 = {
  name: 'xiaohong'
}

console.log(obj1.name)
console.log(obj1.age)

const handler1 = {
  get () {
    throw new Error('error')
  },
  set () {
    throw new Error('error')
  }
}

const obj2 = new Proxy({}, handler1)

Reflect.setPrototypeOf(obj1, obj2)

console.log(obj1.name)
console.log(obj1.age)
