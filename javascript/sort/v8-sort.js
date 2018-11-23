/**
 * V8中插入排序的实现 当数组的个数小于等于22时，采用插入排序效率是最快的。
 */
const InsertionSort = (a, from, to) => {
  if (to - from <= 1) {
    return a
  }
  for (let i = from + 1; i < to; i++) {
    const element = a[i]
    for (let j = i - 1; j >= from; j--) {
      // 将element插入到适合的位置
      const item = a[j]
      const order = compareFunction(element, item)

      if (order > 0) {
        a[j + 1] = item
      } else {
        a[j + 1] = element
        break
      }
    }
  }
}

function compareFunction (x, y) {
  return x < y ? 1 : -1
}

const max = 10

const testCase = Array(max).fill(0).map(() => Math.floor(Math.random() * 100))
InsertionSort(testCase, 0, max)
console.log(testCase)