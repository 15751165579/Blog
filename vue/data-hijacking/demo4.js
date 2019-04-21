/**
 * 数据双向绑定
 * 
 * 
 * 
 *       data
 *        
 *       getter -------> 收集依赖 
 *                                  Watcher -------> 更新视图
 *       setter -------> 通知变化 
 * 
 * 
 * 数据劫持 + 发布订阅
 */

// 四、子元素也为对象的情况
/* eslint-disable */
function defineReactive (obj, key) {
  let val = obj[key]

  const desc = Object.getOwnPropertyDescriptor(obj, key)
  if (desc && desc.configurable === false) {
    return
  }

  // 拿到之前的 getter setter
  const getter = desc && desc.get
  const setter = desc && desc.set

  // 判断值是否也为对象
  /* eslint-disable */
  const childObj = observe(val)

  Object.defineProperty(obj, key, {
    get () {
      const value = getter ? getter.call(obj) : val
      console.log(' === 收集依赖 === ')
      console.log(' 当前值为：' + value)
      return value
    },
    set (newValue) {
      const value = getter ? getter.call(obj) : val
      // 如果值相同则没必要更新 === 的坑点 NaN!!!!
      if (newValue === value || (value !== value && newValue !== newValue)) {
        return
      }

      if (getter && !setter) {
        // 这种情况 不可以赋值
        return
      }

      console.log(' === 通知变更 === ')
      console.log(' 当前值为：' + newValue)

      if (setter) {
        // 调用原始的 setter 方法
        setter.call(obj, newValue)
      } else {
        val = newValue
      }
    }
  })
}

function isObject (val) {
  const type = val
  return val !== null && (type === 'object' || type === 'function')
}

function observe (value) {
  if (!isObject(value)) {
    return
  }

  let ob
  // 避免循环引用造成的递归爆栈问题
  if (value.hasOwnProperty('__ob__') && value.__obj__ instanceof Observer) {
    ob = value.__ob__
  } else if (Object.isExtensible(value)) {
    // 后续需要定义诸如 __ob__ 这样的属性，所以需要能够扩展
    ob = new Observer(value)
  }

  return ob
}

const obj = { name: 'xiaoming' }
Object.preventExtensions(obj)
obj.age = 20
console.log(obj.age)