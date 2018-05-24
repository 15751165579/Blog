/**
 * Two Sum II，Input Array Is Sorted
 */
const twoSum = function (numbers, target) {
  const max = numbers.length
  if (max <= 1) {
    return []
  }
  let first = numbers[0]
  let second = numbers[max - 1]
  let start = 0
  let end = max - 1
  while (start < end) {
    const sum = first + second
    if (sum > target) {
      second = numbers[--end]
    } else if (sum < target) {
      first = numbers[++start]
    } else {
      return [start + 1, end + 1]
    }
  }
}

console.log(twoSum([2, 7, 11, 15], 9))