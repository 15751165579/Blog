function sum (...args) {
  console.log('求和')
  return args.reduce((a, b) => a + b, 0)
}

function multi (...args) {
  console.log('乘积')
  return args.reduce((a, b) => a * b, 1)
}


function cacheProxy (fn) {
  const cache = new Map()

  return function (...args) {
    const key = args.join(',')
    const cacheResult = cache.get(key)
    if (cacheResult !== undefined) {
      return cacheResult
    }

    const result = fn.apply(this, args)
    cache.set(key, result)
    return result
  }
}
const sumProxy = cacheProxy(sum)
console.log(sumProxy(1, 2, 3, 4))
console.log(sumProxy(1, 2, 3, 4))
console.log(sumProxy(1, 2))
const mutilProxy = cacheProxy(multi)
console.log(mutilProxy(1, 2, 3, 4))
console.log(mutilProxy(1, 2, 3, 4))
console.log(mutilProxy(1, 2))
