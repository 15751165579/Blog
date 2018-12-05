const maxSubArray = (nums) => {
  const max = nums.length
  if (max === 0) {
    return 0
  }
  if (max === 1) {
    return nums[0]
  }

  const dp = [0]

  dp[1] = nums[0]

  let ans = Number.MIN_SAFE_INTEGER

  for (let i = 0; i < max; i++) {
    const item = nums[i]
    if (dp[i - 1] > 0) {
      dp[i] = dp[i - 1] + item
    } else {
      dp[i] = item
    }
    ans = Math.max(ans, dp[i])
  }
  return ans
}

console.log(maxSubArray([-2,1,-3,4,-1,2,1,-5,4]), 6)