/**
 * DP
 * 
 * 状态的定义
 * dp[i] 表示从0 - i 最多的pairs对
 * 
 * dp[0] = 0
 * dp[1] = 0
 * 
 * dp[i] = pairs[j][0] > pair[m][1] ? dp[i] + 1 : dp[i]
 * 
 */
const findLongestChain = pairs => {
  const max = pairs.length
  if (max < 2) {
    return 0
  }

  // 递增序列
  pairs.sort((next, pre) => next[1] - pre[1])

  let tar = 0
  // 一维空间转换为常量
  let dp = 0
  for (let i = 1; i < max; i++) {
    if (pairs[i][0] > pairs[tar][1]) {
      dp++
      tar = i
    }
  }
  return dp + 1
}

console.log(findLongestChain([[1,2], [2,3], [3,4]]))
console.log(findLongestChain([[-10,-8],[8,9],[-5,0],[6,10],[-6,-4],[1,7],[9,10],[-4,7]]))
console.log(findLongestChain([[9,10],[-4,9],[-5,6],[-5,9],[8,9]]))