function add(a, b) {
  const type = '[object Number]'
  const toStringProto = Object.prototype.toString
  const typeA = toStringProto.call(a)
  const typeB = toStringProto.call(b)
  if (typeA !== type || typeB !== type) {
    throw new TypeError('a or b must be number')
  }
  return a + b
}

exports.add = add
