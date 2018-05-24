/**
 * Excel Sheet Column Title
 */
const convertToTitle = function (n) {
  const result = []
  while (n !== 0) {
    const a = (n - 1) % 26
    result.unshift(convertToLetter(a))
    n = Math.floor((n - 1) / 26)
  }
  function convertToLetter (n) {
    return String.fromCharCode('A'.charCodeAt(0) + n)
  }
  return result.join('')
}

console.log(convertToTitle(28), 'AB')
console.log(convertToTitle(701), 'ZY')
console.log(convertToTitle(1), 'A')