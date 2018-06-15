const util = require('./util')
/**
 * zip unzip zipObject zipObjectDeep zipWith
 */
function unzip (array) {
  let length = util.isUndef(array) ? 0 : array.length
  if (length < 1) {
    return []
  }

  length = 0
  array.forEach(item => {
    if (util.isArrayLike(item)) {
      length = Math.max(item.length, length)
    }
  })

  let resIndex = -1
  const result = new Array(length)

  while (++resIndex < length) {
    result[resIndex] = array.map(item => item[resIndex])
  }
  return result
}

function zip (...arrays) {
  return unzip(arrays)
}

function zipObject (props, values) {
  const propsLength = util.isUndef(props) ? 0 : props.length
  const valuesLength = util.isUndef(values) ? 0 : values.length
  const result = {}
  if (propsLength < 1 || valuesLength < 1) {
    return result
  }
  let index = -1
  while (++index < propsLength) {
    Object.assign(result, {
      [props[index]]: values[index]
    })
  }
  return result
}

const testcase = [['a', 1, true], ['b', 2, false]]

console.log(unzip(testcase))

console.log(zip(['name', 'age'], ['xiaohong', 20], [true, false]))

console.log(zipObject(['a', 'b'], [1, 2]))


// zipWith
console.log(zip([1, 2], [10, 20], [100, 200]).map(item => item.reduce((total, next) => total + next, 0)))