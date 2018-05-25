/**
 * Majority Element
 */
const majorityElement = function (nums) {
  const m = new Map()

  for (let i = 0, max = nums.length; i < max; i++) {
    const item = nums[i]
    if (!m.get(item)) {
      m.set(item, 0)
    }
    m.set(item, m.get(item) + 1)
  }

  let max = 0
  let result = null
  for (let [key, value] of m.entries()) {
    if (value > max) {
      max = value
      result = key
    }
  }
  return result
}