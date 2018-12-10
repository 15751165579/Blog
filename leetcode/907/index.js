// 907. Sum of Subarray Minimums

/**
 * 这种方法显然会超时
 */
const sumSubarrayMins = A => {
  const max = A.length

  const MAX = 10 ** 9 + 7

  let ans = 0

  for (let i = 0; i < max; i++) {
    let end = i
    let min = Number.MAX_SAFE_INTEGER
    while (end >= 0) {
      min = Math.min(min, A[end])
      ans = (ans + min) % MAX
      end--
    }
  }

  return ans % MAX
}

console.log(sumSubarrayMins([3,1,2,4]), 17)