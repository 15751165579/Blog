/**
 * 
 * rob的变题 
 * 
 * 如何处理首尾相连的问题
 */
const rob = nums => {
  const max = nums.length
  if (max === 0) {
    return 0
  }
  if (max === 1) {
    return nums[0]
  }
  const pre = robNormal(nums.slice(0, max - 1))
  const suf = robNormal(nums.slice(1))

  return Math.max(pre, suf)

  function robNormal (nums) {
    const max = nums.length
    if (max === 0) {
      return 0
    }
    if (max === 1) {
      return nums[0]
    }
    const dp = [0, nums[0]]

    for (let i = 2; i <= max; i++) {
      dp[i] = Math.max(dp[i - 2] + nums[i - 1], dp[i - 1])
    }
    return dp[max]
  }
}

console.log(rob([2,3,2]), 3)
console.log(rob([1,2,3,1]), 4)
console.log(rob([1, 2, 10]), 10)