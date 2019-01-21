/**
 * DP
 * 
 * dp[i] 表示以i结尾的递增序列的长度
 * 
 * dp[0] = 1
 * 
 *          | nums[i] > nums[i - 1] ---> dp[i] = dp[i - 1] + 1
 * dp[i] =  |
 *          | nums[i] <= nums[i - 1] ---> dp[i] = 1
 * 
 * 
 */
/* eslint-disable */
const findLengthOfLCIS = nums => {
  const max = nums.length
  if (max === 0) {
    return 0
  }
  // 一维空间优化
  let dp = 1

  let ans = 1

  for (let i = 1; i < max; i++) {
    if (nums[i] > nums[i - 1]) {
      dp = dp + 1
    } else {
      dp = 1
    }
    ans = Math.max(ans, dp)
  }

  return ans
}