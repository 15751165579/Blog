/**
 * 第一种思路：左边的元素要比后面的元素中的最小值还要小，右边的元素要比左边元素中的最大值还要小
 */
const findUnsortedSubarray = (nums) => {
  const max = nums.length
  if (max <= 1) {
    return 0
  }
  let count = 0
  let isOk = true
  let second = 0
  for (let i = 0; i < max - 1; i++) {
    const item = nums[i]
    for (let j = i + 1; j < max; j++) {
      if (item > nums[j]) {
        isOk = false
        break
      }
    }
    if (isOk) {
      count++
    } else {
      isOk = true
      second = i
      break
    }
  }
  for (let i = max - 1; i > second; i--) {
    const item = nums[i]
    for (let j = i - 1; j >= second; j--) {
      if (item < nums[j]) {
        isOk = false
        break
      }
    }
    if (isOk) {
      count++
    } else {
      break
    }
  }
  return (max - count > 0 ? max - count : 0)
}

console.log(findUnsortedSubarray([2, 6, 4, 8, 10, 9, 15]), 5)
console.log(findUnsortedSubarray([2, 1]), 2)