/**
 * Happy Number
 */
const isHappy = function (n) {
  const keys = new Map()
  return happy(n)
  function happy (n) {
    if (keys.get(n)) {
      return false
    }
    keys.set(n, true)
    if (n === 1) {
      return true
    }
    let str = String(n).split('')
    let sum = 0
    for (let i = 0, max = str.length; i < max; i++) {
      sum += Math.pow(str[i], 2)
    }
    return happy(sum)
  }
}

console.log(isHappy(19))
console.log(isHappy(7))