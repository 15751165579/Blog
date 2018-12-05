// 918. Maximum Sum Circular Subarray
const maxSubarraySumCircular = (A) => {
  let total = A[0]
  let dpmax = A[0]
  let dpmin = A[0]

  let max = A[0]
  let min = A[0]

  for (let i = 1; i < A.length; i++) {
    const item = A[i]
    total += item
    dpmax = Math.max(item, dpmax + item)
    dpmin = Math.min(item, dpmin + item)

    max = Math.max(dpmax, max)
    min = Math.min(dpmin, min)
  }
  return max > 0 ? Math.max(max, total - min) : max
}

console.log(maxSubarraySumCircular([1,-2,3,-2]), 3)
console.log(maxSubarraySumCircular([5, -3, 5]), 10)
console.log(maxSubarraySumCircular([3,-1,2,-1]), 4)
console.log(maxSubarraySumCircular([3,-2,2,-3]), 3)
console.log(maxSubarraySumCircular([-2,-3,-1]), -1)