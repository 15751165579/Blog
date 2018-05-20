/**
 * sqrt
 */
const mySqrt = function (x) {
  return parseInt(Math.sqrt(x))
}

// 二分法
const mySqrt2 = function (x) {
  if (x <= 0) {
    return 0
  }
  let min = 1
  let max = x
  while (min + 1 < max) {
    const mid = Math.floor((max - min) / 2) + min
    const temp = mid * mid
    if (temp === x) {
      return mid
    } else if (temp > x) {
      max = mid
    } else {
      min = mid
    }
  }
  if (max * max <= x) {
    return max
  } else {
    return min
  }
}

// 牛顿法
const mySqrt3 = function (x) {
  let result = x
  while (result * result > x) {
    result = Math.floor((result + x / result) / 2)
  }
  return result
}

console.log(mySqrt2(8))
console.log(mySqrt3(5))