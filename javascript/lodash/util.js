/**
 * 判断小数
 */

console.log('0.2', String(0.2).indexOf('.') !== -1)

console.log('0.2', parseInt(0.2) !== 0.2)

console.log('0.2', (0.2 % 1) !== 0)

/**
 * 判断正整数
 */
exports.isLength = function isLength (value) {
  return typeof value === 'number' && value > -1 && value % 1 === 0 && value <= Number.MAX_SAFE_INTEGER
}

/**
 * 判断是否为null 或者 undefined
 */
exports.isUndef = function isUndef (value) {
  return (value === undefined || value === null)
}

/**
 * 类型
 */
function type (obj) {
  const typeString = Reflect.apply(Object.prototype.toString, obj, [])
  return typeString.replace(/^\[object\s(\w+)\]$/, '$1').toLowerCase()
}

exports.isArguments = obj => type(obj) === 'arguments'

exports.isArray = obj => type(obj) === 'array'

exports.isArrayLike = obj => (type(obj) === 'array' || type(obj) === 'arguments')

exports.isUndefined = obj => type(obj) === 'undefined'