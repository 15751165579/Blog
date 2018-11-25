const search = (nums, target) => {
  let min = 0
  let max = nums.length - 1
  while (min <= max) {
    const mid = (max + min) >> 1
    const item = nums[mid]
    if (target > item) {
      min = mid + 1
    } else if (target < item) {
      max = mid - 1
    } else {
      return mid
    }
  }
  return -1
}

console.log(search([-1,0,3,5,9,12], 9), 4)
console.log(search([-1,0,3,5,9,12], 2), -1)