/**
 * DP
 * 
 * dp[i] 表示第i个房子可以抢多少钱
 * 
 * dp[0] = 0
 * 
 * dp[1] = nums[1]
 * 
 * 
 * dp[i] = max(dp[i - 2] + nums[i], dp[i - 1])
 * 
 */
const rob = nums => {
  const max = nums.length
  if (max === 0) {
    return 0
  }
  if (max < 2) {
    return nums[0]
  }

  const dp = []
  dp[0] = 0
  dp[1] = nums[0]
  for (let i = 2; i <= max; i++) {
    dp[i] = Math.max(dp[i - 2] + nums[i - 1], dp[i - 1])
  }
  return dp[max]
}

console.log(rob([1,2,3,1]), 4)
console.log(rob([2,7,9,3,1]), 12)