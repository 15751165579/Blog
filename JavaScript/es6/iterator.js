/**
 * 作用
 * 1、提供统一的接口
 * 2、使得数据结构的成员按照某种次序排列
 * 3、for of , 扩展运算符 Array.from 主要消费 iterator
 */

// 模拟 iterator

function iterator (array) {
  let startIndex = 0
  return {
    next () {
      return startIndex < array.length ? ({value: array[startIndex++], done: false }) : ({value: undefined, done: true})
    }
  }
}

const it = iterator([1, 2, 3])

console.log(it.next())
console.log(it.next())
console.log(it.next())
console.log(it.next())

// 元编程 Symbol.iterator 对象是非遍历对象

// for in 

// 1、数组的键名 会被转化为字符串
// 2、原型链会对其造成影响
// 3、任意顺序遍历键名

const arr = [1, 2, 3]

const arrIterator = arr[Symbol.iterator]()

console.log(arrIterator.next())
console.log(arrIterator.next())
console.log(arrIterator.next())
console.log(arrIterator.next())
