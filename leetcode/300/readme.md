# JavaScript刷LeetCode -- 300. Longest Increasing Subsequence [Medium]

### 一、解题思路

  &emsp;&emsp;这是一道典型的DP问题，首先需要定义一个状态。

```s
  dp[i] 表示 0 ~ i 中最长单调递增序列的长度
```

  &emsp;&emsp;一开始，可能会想到定义这样的状态，但是试图需要nums[i]与dp的关系时，你会发现无法确定dp[i]中最长递增序列是以哪一个num结尾的，从而你无法与当前的num构成递推关系。

```s
  dp[i] 表示以nums[i]为结尾的最长单调递增序列的长度
```

  &emsp;&emsp;第二步，边界条件

```s
  dp[m] = 1  m >= 0 and m < max
```

  &emsp;&emsp;第三步，递推公式

```s
            | dp[i]
  dp[i] =   |
            | dp[k] + 1 条件 nums[i] > nums[k] and k >= 0 and k < i
```

  &emsp;&emsp;另外需要利用一个常量来记录单调递增序列的最长长度。

### 二、代码实现

```JavaScript
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
```