# JavaScript刷LeetCode -- 712. Minimum ASCII Delete Sum for Two Strings [Medium]

#### 一、题目

  &emsp;&emsp;Given two strings s1, s2, find the lowest ASCII sum of deleted characters to make two strings equal.

#### 二、题目大意

  &emsp;&emsp;给定两个字符串s1，s2，找到删除字符的最低ascii和，使两个字符串相等。

#### 三、解题思路

  &emsp;&emsp;这是一道典型的动态规划题目：

##### 1、定义状态

```s
  dp[i][j] 表示 s1[0][i] 与 s2[0][j] 相等时删除字符的最低ascii和
```

##### 2、边界情况

```s
  # 初始化状态
  dp[0][0] = 0
  # 边界
  dp[i][0] = dp[i - 1][0] + s1[i - 1]
  dp[0][j] = dp[0][j - 1] + s2[j - 1]
```

##### 3、递归公式

```s
              | - dp[i - 1][j - 1]    s1[i] == s2[j]
  dp[i][j] =  |
              | - Math.min(dp[i - 1][j] + s1[i], dp[i][j - 1] + s2[j])   s1[i] != s2[j]
```

#### 四、代码实现

```JavaScript
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
```


