/**
 * for in + 递归
 */
const obj = {
  student: {
    name: 'xiaohong'
  },
  score: [1, 2, 3]
}

function isObject (value) {
  const type = typeof value
  return value != null & (type === 'object' || type === 'function')
}

function deepCopy (value) {
  const result = Array.isArray(value) ? [] : {}

  for (let key in value) {
    result[key] = isObject(value[key]) ? deepCopy(value[key]) : value[key]
  }

  return result
}

const obj1 = deepCopy(obj)

console.log(obj1)
console.log(obj)
console.log(obj.student === obj1.student)

// 这种方式也能处理 基本对象 和 数组对象