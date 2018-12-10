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

const sumSubarrayMins1 = A => {
  const MAX = 10 ** 9 + 7
  const max = A.length
  let ans = 0

  const left = []

  for (let i = 0; i < max; i++) {
    let end = i
    const item = A[i]
    while (--end >= 0) {
      if (A[end] >= item) {
        continue
      } else {
        break
      }
    }
    left[i] = i - end - 1
  }
  
  const right = []

  for (let i = 0; i < max; i++) {
    let end = i
    const item = A[i]
    while (++end < max) {
      if (A[end] > item) {
        continue
      } else {
        break
      }
    }
    right[i] = end - i - 1
  }
  for (let i = 0; i < max; i++) {
    const l = left[i]
    const r = right[i]
    ans = (ans + ((l + r + l * r + 1) * A[i]) % MAX) % MAX
  }
  return ans
}

console.log(sumSubarrayMins1([3,1,2,4]), 17)
console.log(sumSubarrayMins1([71,55,82,55]), 593)