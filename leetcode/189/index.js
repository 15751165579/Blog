/**
 * Rotate Array
 */
const rotate = function (nums, k) {
  while (k > 0) {
    k--
    const item = nums.pop()
    nums.unshift(item)
  }
  return nums
}

const nums = [-1, -100, 3, 99]
rotate(nums, 2)
console.log(nums)