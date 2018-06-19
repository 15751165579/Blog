/**
 * 过滤数组中的假值
 */
function compact (array) {
  const length = isUndef(array) ? 0 : array.length
  const result = []
  if (length < 1) {
    return result
  }

  let resIndex = 0
  for (let item of array) {
    if (item) {
      result[resIndex++] = item
    }
  }
  return result
}

function isUndef (obj) {
  return (obj === null || obj === undefined)
}