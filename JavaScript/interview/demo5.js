/* eslint-disable */
function isObject(obj) {
  return (obj && typeof obj === 'object')
}

function deepCopy(source, record = new WeakMap()) {
  if (record.has(source)) {
    return record.get(source)
  }

  let cloneObj = Array.isArray(obj) ? [] : {}
  record.set(source, cloneObj)
  for (let key in source) {
    cloneObj[key] = isObject(source[key]) ? deepCopy(source[key]. record) : source[key]
  }

  return cloneObj
}