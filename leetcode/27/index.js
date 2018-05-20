/**
 * 移除元素
 */

const removeElement = function (nums, val) {
  let max = nums.length
  let start = 0
  while (start < max) {
    const item = nums[start]
    if (item === val) {
      nums.splice(start, 1)
      max--
    } else {
      start++
    }
  }
  return max
}

const nums = [3, 2, 2, 3]

const len = removeElement(nums, 3)

for (let i = 0; i < len; i++) {
  console.log(nums[i])
}


