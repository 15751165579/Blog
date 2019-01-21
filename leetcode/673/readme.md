# JavaScript刷LeetCode -- 673. Number of Longest Increasing Subsequence [Medium]

### 一、解题思路

  &emsp;&emsp;这道题是【300. Longest Increasing Subsequence】的变题，还是需要先采用DP求解最长单调递增序列，然后再定义：

```s
  amount[i] 表示以nums[i]结尾的最长序列的个数
```

  &emsp;&emsp;初始状态:

```s
  amount[i] = 1
```

  &emsp;&emsp;递推公式:

```s
                |  amount[i] = amount[j] 条件 dp[j] + 1 > dp[i] and j >= 0 and j < i 
  amount[i] =   | 
                |  amount[i] += amount[j] 条件 dp[j] + 1 === dp[i]
```

### 二、代码实现

```JavaScript
const findNumberOfLIS = nums => {
  const max = nums.length
  let ans = 0
  if (max === 0) {
    return ans
  }

  const dp = new Array(max).fill(1)

  const amount = new Array(max).fill(1)
  for (let i = 0; i < max; i++) {
    const item = nums[i]
    for (let j = 0; j < i; j++) {
      const sub = nums[j]
      if (item > sub) {
        // 这个地方需要改造一下
        if (dp[j] + 1 > dp[i]) {
          dp[i] = dp[j] + 1
          amount[i] = amount[j]
        } else if (dp[j] + 1 === dp[i]) {
          amount[i] += amount[j]
        }
      }
    }
    ans = Math.max(ans, dp[i])
  }
  let sum = 0
  for (let i = 0; i < dp.length; i++) {
    if (dp[i] === ans) {
      sum += amount[i]
    }
  }
  return sum
}
```