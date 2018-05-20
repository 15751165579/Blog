/**
 * 删除排序数组中的重复项
 */
const removeDuplicates = function (nums) {
  const max = nums.length
  if (max === 0 || max === 1) {
    return max
  }
  let start = 1
  let num = nums[0]
  for (let i = 1; i < max; i++) {
    const item = nums[i]
    if (item !== num) {
      num = item
      nums.splice(start++, 1, item)
    }
  }
  return start
}

const nums = [0, 0, 1, 1, 1, 2, 2, 3, 3, 4]

const len = removeDuplicates(nums)

console.log(len)

for (let i = 0; i < len; i++) {
  console.log(nums[i])
}
