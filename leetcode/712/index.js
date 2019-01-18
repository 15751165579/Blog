/**
 * 动态规划
 * 
 * 1、状态的定义
 * dp[i][j] 表示 s1[0][i] 转化为s2[0][j]的最小值
 * 
 * 2、边界情况
 * dp[0][0] = 0
 * dp[i][0] = dp[i - 1][0] + s1[i - 1]
 * dp[0][j] = dp[0][j - 1] + s2[j - 1]
 * 
 * 3、递推公式
 *             dp[i - 1][j - 1]  s1[i] = s2[j]
 * dp[i][j] =  Math.min(dp[i - 1][j] + s1[i], dp[i][j - 1] + s2[j]) s1[i] != s2[j]
 */
const minimumDeleteSum = (s1, s2) => {
  const dp = []
  dp[0] = []
  dp[0][0] = 0

  const len1 = s1.length
  const len2 = s2.length

  // 注意 下标
  for (let i = 1; i <= len1; i++) {
    if (!dp[i]) {
      dp[i] = []
    }
    dp[i][0] = dp[i - 1][0] + s1[i - 1].charCodeAt(0)
  }

  for (let j = 1; j <= len2; j++) {
    if (!dp[j]) {
      dp[j] = []
    }
    dp[0][j] = dp[0][j - 1] + s2[j - 1].charCodeAt(0)
  }

  for (let i = 1; i <= len1; i++) {
    for (let j = 1; j <= len2; j++) {
      const x = s1[i - 1].charCodeAt(0)
      const y = s2[j - 1].charCodeAt(0)

      if (x === y) {
        dp[i][j] = dp[i - 1][j - 1]
      } else {
        dp[i][j] = Math.min(dp[i - 1][j] + x, dp[i][j - 1] + y)
      }
    }
  }
  return dp[len1][len2]
}

console.log(minimumDeleteSum('delete', 'leet'))