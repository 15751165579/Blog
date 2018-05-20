/**
 * 搜索插入位置
 */
const searchInsert = function (nums, target) {
  const max = nums.length
  for (let i = 0; i < max; i++) {
    const item = nums[i]
    if (target <= item) {
      return i
    }
  }
  return max
}


const searchInsert2 = function (nums, target) {
  let min = 0;
  let max = nums.length - 1
  while (min + 1 < max) {
    const mid = parseInt((max - min) / 2) + min
    const midNumer = nums[mid]
    if (midNumer === target) {
      return mid
    } else if (midNumer > target) {
      max = mid
    } else {
      min = mid
    }
  }
  if (nums[min] >= target) {
    return min
  } else if (nums[max] >= target) {
    return max
  } else {
    return max + 1
  }
}

console.log(searchInsert2([1, 3, 5, 6], 5), 2)
console.log(searchInsert2([1, 3, 5, 6], 2), 1)
console.log(searchInsert2([1, 3, 5, 6], 7), 4)
console.log(searchInsert2([1, 3, 5, 6], 0), 0)
