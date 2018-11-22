/* eslint-disable */
/**
 * ++++-----
 * 1、至少有两个元素满足递增
 * 2、至少有两个元素满足递减
 * 3、先减后增
 */
const validMountainArray = (A) => {
  const max = A.length
  if (max < 3) {
    return false
  }
  let asc = 0
  for (let i = 0; i < max - 2; i++) {
    const pre = A[i]
    const next = A[i + 1]
    if (next - pre > 0) {
      asc = i + 1
    } else {
      break
    }
  }
  if (asc === 0) {
    return false
  }

  for (let i = asc; i < max - 1; i++) {
    const pre = A[i]
    const next = A[i + 1]
    if (next - pre < 0) {
      asc = i + 1
    } else {
      break
    }
  }
  if (asc === max - 1) {
    return true
  }
  return false
}

// const testcase1 = [2, 1]
// console.log(validMountainArray(testcase1))

// const testcase2 = [3, 5, 5]
// console.log(validMountainArray(testcase2))

// const testcase3 = [0, 3, 2, 1]
// console.log(validMountainArray(testcase3))

const testcase4 = [9, 8, 7, 6, 5, 4, 3, 2, 1, 0]
console.log(validMountainArray(testcase4))