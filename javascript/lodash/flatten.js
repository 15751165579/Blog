const lodash = require('lodash')
const util = require('./util')
/**
 * 数组的扁平化
 * 
 * Symbol.isConcatSpreadable 控制concat
 */

function baseFlatten (array, depth, result) {
  result || (result = [])
  if (util.isUndef(array)) {
    return result
  }

  for (let item of array) {
    if (depth > 0 && util.isArrayLike(item)) {
      if (depth > 1) {
        baseFlatten(item, depth - 1, result)
      } else {
        result.push(...item)
      }
    } else if (!util.isUndefined(item)) { // 除去空值
      result[result.length] = item
    }
  }
  return result
}

function flatten (array, deep) {
  const length = util.isUndef(array) ? 0 : array.length
  deep || (deep = Infinity)
  return length ? baseFlatten(array, deep) : []
}

const array = [false, 1, 2, 3, ,[4, 5, [6]]]

console.log(flatten(array, 1))

console.log(array.filter(item => item)) // 并不能用filter去除空项
