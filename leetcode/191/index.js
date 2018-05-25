/**
 * Number of 1Bits
 */
const hammingWeight = function (n) {
  let count = 0
  while (n) {
    n &= (n - 1)
    ++count
  }
  return count
}

const hammingWeight1 = function (n) {
  return (n).toString(2).replace(/0/g, '').length
}

console.log(hammingWeight(11), 3)
console.log(hammingWeight(128), 1)