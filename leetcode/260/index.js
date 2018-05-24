/**
 * Single Number III
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

  let num1 = null
  let num2 = null
  for (let [key, value] of m.entries()) {
    if (value === 1 && num1 === null) {
      num1 = key
    } else if (value === 1 && num2 === null) {
      num2 = key
      return [num1, num2]
    }
  }
}

console.log(singleNumber([1, 2, 1, 3, 2, 5]))