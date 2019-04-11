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

// 三、自身设置了 getter setter
function defineReactive (obj, key) {
  let val = obj[key]

  const desc = Object.getOwnPropertyDescriptor(obj, key)
  if (desc && desc.configurable === false) {
    return
  }

  // 拿到之前的 getter setter
  const getter = desc && desc.get
  const setter = desc && desc.set

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

const student = {}

function defineReactiveOrigin (obj, key) {
  let _val = 'xiaoming'
  Object.defineProperty(obj, key, {
    get () {
      console.log(' *** 原始的 getter *** ')
      return _val
    },
    set (newValue) {
      console.log(' *** 原始的 setter *** ')
      _val = newValue
    },
    enumerable: true,
    configurable: true
  })
}

defineReactiveOrigin(student, 'name')

defineReactive(student, 'name')

student.name
student.name = 'xiaohong'
student.name