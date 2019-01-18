/* eslint-disable */
/**
 * 
 * 定义状态
 * dp[i] 表示当i时刻 赚取的最大利润
 * 
 * 边界情况
 * dp[0] = 0
 * dp[1] = 0
 * 
 * 递推公式
 * 
 * dp[i] = Math.max(dp[i - 1], ??????)
 * 
 * 这里需要引入局部最大利润 local
 * 
 * local = Math.max(local + price[i] - price[i - 1], 0)
 * 
 * 
 */
const maxProfit = prices => {
  const max = prices.length
  const dp = [0, 0]

  let local = 0
  // 注意下标
  for (let i = 2; i <= max; i++) {
    local = Math.max(local + prices[i - 1] - prices[i - 2], 0)
    dp[i] = Math.max(dp[i - 1], local)
  }
  return dp[max]
}