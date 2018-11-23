/**
 * 
 * 感觉我思考问题的方式不太对。
 */
const minDeletionSize = (A) => {
  const max = A.length
  if (!max) {
    return 0
  }
  const subMax = A[0].length
  let ans = 0
  for (let i = 0; i < subMax; i++) {
    for (let j = 0; j < max - 1; j++) {
      if (A[j][i] > A[j + 1][i]) {
        ans++
        break
      }
    }
  }
  return ans
}

const t1 = ['cba', 'daf', 'ghi']
const t2 = ['a', 'b']
const t3 = ['zyx', 'wvu', 'tsr']

console.log(minDeletionSize(t1), 1)
console.log(minDeletionSize(t2), 0)
console.log(minDeletionSize(t3), 3)