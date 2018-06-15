function chunck(array, size) {
  size = Math.max(size, 0)
  const length = isUndef(array) ? 0 : array.length
  if (!length || size < 1) {
    return []
  }
  let index = 0
  let resIndex = 0
  const result = new Array(Math.ceil(length / size))

  while (index < length) {
    result[resIndex++] = slice(array, index, (index += size))
  }
  return result
}

// 先处理函数参数的缺省值
// 再考虑边界情况
// 对于数字通过 >>> 0 取整 去除小数的情况
function slice(array, start, end) {
  let length = isUndef(array) ? 0 : array.length
  if (length < 0) {
    return []
  }

  start = isUndef(start) ? 0 : start
  end = isUndef(end) ? length : end

  if (start < 0) {
    start = -start > length ? 0 : (length + start)
  }

  end = end > length ? length : end
  if (end < 0) {
    end += length
  }
  length = start > end ? 0 : ((end - start) >>> 0)
  start >>>= 0

  let index = -1
  const result = new Array(length)
  while (++index < length) {
    result[index] = array[index + start]
  }
  return result
}

function isUndef (obj) {
  return (obj === undefined || obj === null)
}

const testcase = [1, 2, 3, 4, 5, 6, 7, 8, 9]

// 对于函数的默认值的处理 

// ES6中的函数默认值 实际上就是 x === undefined ? 默认值 : x

// 实际上但部分会采用 x || 默认值 这样虽然你解决null undefined 的问题 ，但是同时会过滤掉0 false ''

// 第三种就是我们上述的 isUndef方法 分别判断 null 和 undefined

console.log(slice(testcase, 1, 5))
console.log(slice(testcase, -2))

console.log(chunck(testcase, 3))
console.log(chunck(testcase, 4))
