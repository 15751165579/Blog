/*eslint-disable */
/**
 * 动态规划
 * dp[i][j] 表示第i次交易在第j天的最大利润
 * 
 * dp[0][j] = 0
 * dp[i][0] = 0
 *            | - dp[i][j - 1]
 * dp[i][j] = | -
 *            | - price[j - 1] + price[m] + dp[i - 1][m]  0 <= m <= j - 1
 */
const maxProfit = (k, prices) => {
  const max = prices.length
  if (max < 2) {
    return 0
  }

  const dp = []
  
  // 初始状态
  for (let i = 0; i <= k; i++) {
    dp[i] = [0]
    if (i === 0) {
      for (let j = 0; j <= max; j++) {
        dp[i][j] = 0
      }
    }
  }

  for (let i = 1; i <= k; i++) {
    for (let j = 1; j <= max; j++) {
      let max = dp[i][j - 1]

      for (let n = 0; n < j; n++) {
        max = Math.max(max, prices[j - 1] - prices[n] + dp[i - 1][n])
      }

      dp[i][j] = max
    }
  }

  return dp[k][max]
}