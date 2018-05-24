/**
 * Single Number 2
 */

const singleNumber = function (nums) {
  const temp = new Map()

  for (let i = 0, max = nums.length; i < max; i++) {
    const item = nums[i]
    if (!temp.get(item)) {
      temp.set(item, 0)
    }
    temp.set(item, temp.get(item) + 1)
  }

  for (let [key, value] of temp.entries()) {
    if (value === 1) {
      return key
    }
  }
}

