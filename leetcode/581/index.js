/**
 * 第一种思路：左边的元素要比后面的元素中的最小值还要小，右边的元素要比左边元素中的最大值还要小
 * 第二种思路 很清奇
 */
const findUnsortedSubarray = (nums) => {
  const len = nums.length
  if (len <= 1) {
    return 0
  }
  let x = 0
  let y = -1
  let max = Number.MIN_SAFE_INTEGER
  let min = Number.MAX_SAFE_INTEGER

  for (let i = 0, j = len - 1; j >= 0; i++, j--) {
    const pre = nums[i]
    max = Math.max(max, pre)
    if (pre !== max) {
      y = i
    }
    const next = nums[j]
    min = Math.min(min, next)
    if (next !== min) {
      x = j
    }
  }
  return (y - x + 1)
}

console.log(findUnsortedSubarray([2, 6, 4, 8, 10, 9, 15]), 5)
console.log(findUnsortedSubarray([2, 1]), 2)
console.log(findUnsortedSubarray([1,2,3,4]), 0)