function bubbleSort(array) {
  const max = array.length
  // 比较多少趟
  for (let i = 0; i < max - 1; i++) {
    // 比较多少次
    for (let j = 0; j < max - i - 1; j++) {
      if (array[j] > array[j + 1]) {
        [array[j], array[j+1]] = [array[j+1], array[j]]
      }
    }
  }
}

const testcase = [85,24,63,17,31,17,86,50]
// bubbleSort(testcase)
// console.log(testcase)
console.log(bubbleSort)

function quickSort(array) {
  if (array.length <= 1) {
    return array
  }
  const pivotIndex = Math.floor(array.length / 2)
  const pivot = array.splice(pivotIndex, 1)[0]
  const left = []
  const right = []
  for (let item of array) {
    if (item < pivot) {
      left.push(item)
    } else {
      right.push(item)
    }
  }
  return quickSort(left).concat([pivot], quickSort(right))
}
console.log(quickSort(testcase))
