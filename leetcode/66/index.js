/**
 * 加一
 */
const plusOne = function (digits) {
  const max = digits.length - 1
  let num = 1
  for (let i = max; i >= 0; i--) {
    const item = digits[i] + num
    digits.splice(i, 1, item % 10)
    if (item < 10) {
      return digits
    }
  }
  digits.unshift(1)
  return digits
}

console.log(plusOne([1, 2, 3]))
console.log(plusOne([9]))
console.log(plusOne([0]))