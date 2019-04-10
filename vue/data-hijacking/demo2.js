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

// 二、属性描述符的影响
function defineReactive (obj, key) {
  let val = obj[key]

  const desc = Object.getOwnPropertyDescriptor(obj, key)

  if (desc && desc.configurable === false) {
    return
  }

  Object.defineProperty(obj, key, {
    get () {
      console.log(' === 收集依赖 === ')
      console.log(' 当前值为：' + val)
      return val
    },
    set (newValue) {
      console.log(' === 通知变更 === ')
      console.log(' 当前值为：' + newValue)
      val = newValue
    }
  })
}

// 第一种方式 defineProperty 设置 属性 不可配置
// const student = {}
// Object.defineProperty(student, 'name', {
//   value: 'xiaoming',
//   enumerable: true,
//   writable: true,
//   configurable: false
// })

// 第二种方式 采用 Object.seal() 方法
// const student = {
//   name: 'xiaoming'
// }

// Object.seal(student)


// 第三种方式 采用 Object.freeze() 方法
const student = {
  name: 'xiaoming'
}

Object.freeze(student)

defineReactive(student, 'name')

student.name
student.name = 'xiaohong'
student.name