const minIncrementForUnique = (A) => {
  const max = A.length
  const m = {}
  let moved = 0
  for (let i = 0; i < max; i++) {
    let item = A[i]
    if (m[item]) {
      while (m[item]) {
        item++
        moved++
      }
    }
    m[item] = true
  }
  return moved
}

const testCase = [1, 2, 2]
const testCase1 = [3, 2, 1, 2, 1, 7]

console.log(minIncrementForUnique(testCase), 1)
console.log(minIncrementForUnique(testCase1), 6)