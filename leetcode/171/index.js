/**
 * Excel Sheet Column Number
 */
const titleToNumber = function (s) {
  let result = 0
  const max = s.length - 1
  for (let i = max; i >= 0; i--) {
    const item = s[i]
    result += convertNumber(item) * Math.pow(26, max - i)
  }

  function convertNumber (str) {
    return str.charCodeAt(0) - 64
  }
  return result
}

console.log(titleToNumber('A'))
console.log(titleToNumber('AB'))
console.log(titleToNumber('ZY'))