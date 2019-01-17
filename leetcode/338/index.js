/* eslint-disable */
const countBits = num => {
  const dp = []
  dp[0] = 0
  for (let i = 1; i <= num; i++) {
    dp[i] = dp[i >> 1] + (i & 1)
  }
  return dp 
}