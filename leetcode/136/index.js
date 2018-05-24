/**
 * Single Number
 */

const singleNumber = function (nums) {
  const m = new Map()

  for (let i = 0, max = nums.length; i < max; i++) {
    const item = nums[i]
    if (!m.get(item)) {
      m.set(item, 0)
    }
    m.set(item, m.get(item) + 1)
  }

  for (let [key, value] of m.entries()) {
    if (value === 1) {
      return key
    }
  }
}

const singleNumber2 = function (nums) {
  let result = 0
  const max = nums.length
  for (let i = 0; i < max; i++) {
    result ^= nums[i]
  }
  return result
}

console.log(singleNumber([2, 2, 1]))

console.log(singleNumber2([4, 1, 2, 1, 2]))