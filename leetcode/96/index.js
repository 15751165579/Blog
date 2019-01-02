/**
 * Unique Binary Search Tree
 * 
 * dp
 * 
 * 状态 dp[n] 表示n个节点生成BST的数量
 * 
 * 初始状态 dp[0] = 1 dp[1] = 1
 * 
 * 
 * 递推公式 dp[n] = dp[1] * dp[n - 1] + dp[2] * dp[n - 2] ....
 * 
 */

const numTrees = function (n) {
  const dp = new Array(n + 1).fill(0)
  dp[0] = 1
  dp[1] = 1

  for (let i = 2;i <= n; i ++) {
    for (let j = 0; j < i; j++) {
      dp[i] += dp[j] * dp[i - j - 1]
    }
  }
  return dp[n]
}

console.log(numTrees(3))