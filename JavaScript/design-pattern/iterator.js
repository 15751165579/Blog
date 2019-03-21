const arr = [1, 2, 3, 4]

function iterator (obj) {
  let nextIndex = 0
  return {
    next () {
      if (nextIndex < obj.length) {
        return { value: obj[nextIndex++], done: false }
      }
      return { value: undefined, done: true }
    }
  }
}

const it = iterator(arr)

console.log(it.next())
console.log(it.next())
console.log(it.next())
console.log(it.next())
console.log(it.next())

// JavaScript 除了对象 ，例如数组 map set 字符串 都部署了iterator接口 Symbol.iterator
// 扩展运算符 解构 以及 for of 都是在消费 iterator