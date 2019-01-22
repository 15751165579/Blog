/**
 * DP
 * 
 * dp[i] 第i阶花费的最少成本
 * 
 * 题目中默认 最小台阶数大于2
 * 
 * 初始状态
 * dp[0] = cost[0]
 * dp[1] = cost[1]
 * 
 * 递推公式 dp[i] = Math.min(dp[i - 1], dp[i - 2]) + cost[i]
 * 
 * 这里需要主要的实际上给定cost , 还有默认的 cost[max] = 0
 */
const minCostClimbingStairs = cost => {
  const max = cost.length

  const dp = []
  dp[0] = cost[0]
  dp[1] = cost[1]
  for (let i = 2; i < max; i++) {
    dp[i] = Math.min(dp[i - 1], dp[i - 2]) + cost[i]
  }
  return Math.min(dp[max - 1], dp[max - 2])
}

console.log(minCostClimbingStairs([10, 15, 20]), 15)
console.log(minCostClimbingStairs([1, 100, 1, 1, 1, 100, 1, 1, 100, 1]), 6)