/**
 * 函数柯里化
 */
function curry(fn, ...args) {
  return args.length === fn.length ? fn(...args) : (...rest) => curry(fn, ...args, ...rest)
}


function sum(x, y) {
  return x + y
}

const a = curry(sum, 10)
console.log(a(20))
console.log(a(1))
