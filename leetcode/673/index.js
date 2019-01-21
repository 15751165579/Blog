const findNumberOfLIS = nums => {
  const max = nums.length
  let ans = 0
  if (max === 0) {
    return ans
  }

  const dp = new Array(max).fill(1)

  const amount = new Array(max).fill(1)
  for (let i = 0; i < max; i++) {
    const item = nums[i]
    for (let j = 0; j < i; j++) {
      const sub = nums[j]
      if (item > sub) {
        // 这个地方需要改造一下
        if (dp[j] + 1 > dp[i]) {
          dp[i] = dp[j] + 1
          amount[i] = amount[j]
        } else if (dp[j] + 1 === dp[i]) {
          amount[i] += amount[j]
        }
      }
    }
    ans = Math.max(ans, dp[i])
  }
  let sum = 0
  for (let i = 0; i < dp.length; i++) {
    if (dp[i] === ans) {
      sum += amount[i]
    }
  }
  return sum
}

console.log(findNumberOfLIS([1,3,5,4,7]), 2)
console.log(findNumberOfLIS([2,2,2,2,2]), 5)
console.log(findNumberOfLIS([1,2,4,3,5,4,7,2]), 3)
console.log(findNumberOfLIS([2, 1]), 2)
console.log(findNumberOfLIS([3, 1, 2]), 1)
console.log(findNumberOfLIS([1,3,2]), 2)
console.log(findNumberOfLIS([1,1,1,2,2,2,3,3,3]), 27)
console.log(findNumberOfLIS([100,90,80,70,60,50,60,70,80,90,100]), 1)