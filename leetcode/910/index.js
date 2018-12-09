// 910. Smallest Range II

/**
 * 将每个元素都减去K， 从而将问题转换为将部分元素加上2 * K的问题
 */
const smallestRangeII = (A, K) => {
  A.sort((a, b) => a - b)
  const max = A.length
  let ans = A[max - 1] - A[0]
  for (let i = 0; i < max - 1; i++) {
    ans = Math.min(ans, Math.max(A[max - 1], A[i] + 2 * K) - Math.min(A[i + 1], A[0] + 2 * K))
  }
  return ans
}

console.log(smallestRangeII([1,3,6], 3), 3)
console.log(smallestRangeII([1], 0), 0)
console.log(smallestRangeII([0, 10], 2), 6)