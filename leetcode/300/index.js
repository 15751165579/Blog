/**
 * DP
 * 
 * 难度在于如何定义状态
 * 
 * dp[i] 表示以nums[i]结尾的字符的递增序列的长度
 * 
 * dp[0 ~ i] = 1
 * 
 * dp[i] = max(dp[m] + 1, dp[i]) nums[i] >= nums[m]  m = [0 ~ i - 1]
 * 
 */
const lengthOfLIS = nums => {
  const max = nums.length
  let ans = 0
  if (max === 0) {
    return ans
  }

  const dp = new Array(max).fill(1)
  for (let i = 0; i < max; i++) {
    const item = nums[i]
    for (let j = 0; j < i; j++) {
      const sub = nums[j]
      if (item > sub) {
        dp[i] = Math.max(dp[i], dp[j] + 1)
      }
    }
    ans = Math.max(ans, dp[i])
  }
  return ans
}

console.log(lengthOfLIS([10,9,2,5,3,7,101,18]), 4)
console.log(lengthOfLIS([1,3,6,7,9,4,10,5,6]), 6)
console.log(lengthOfLIS([0]), 1)