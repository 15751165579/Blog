/**
 * 上述方式对于循环引用都无效
 * 
 * 通过hashmap 处理
 */

const obj = {
  name: '123'
}

obj.obj = obj

function isObject (value) {
  const type = typeof value
  return value != null & (type === 'object' || type === 'function')
}

function deepCopy (value, hashmap = new WeakMap()) {
  if (hashmap.get(value)) {
    return hashmap.get(value)
  }
  const result = Array.isArray(value) ? [] : {}
  hashmap.set(value, result)
  for (let key in value) {
    result[key] = isObject(value[key]) ? deepCopy(value[key], hashmap) : value[key]
  }
  return result
}

const obj1 = deepCopy(obj)
console.log(obj1)

// 对于其它数据类型 需要确定具体的类型 在调用相关的构造函数生成新的对象
// 具体可以查看 Lodash 中的 deepCopy 方法