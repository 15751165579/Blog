# JavaScript刷LeetCode -- 646. Maximum Length of Pair Chain【Medium】

### 一、解题思路

  &emsp;&emsp;这是一道典型的DP类题目，但是对于这个给定的数组需要进行排序，不然很难总结出dp的递推公式。

  &emsp;&emsp;对数组排序之后，那么就按照DP的套路依次进行下去：

  &emsp;&emsp;第一步，定义状态

```s
  dp[i] 表示从0 ~ i 最长 pair chain
```

  &emsp;&emsp;第二步，边界条件

```s
  dp[0] = 0
  dp[1] = 1
```

  &emsp;&emsp;第三步，递推公式

```
  dp[i] = pairs[i][0] > pairs[m][1] ? dp[i - 1] + 1 : dp[i - 1]
```

  &emsp;&emsp;实现过程中，可以将一维数组优化为常量。

### 二、代码实现

```JavaScript
const findLongestChain = pairs => {
  const max = pairs.length
  if (max < 2) {
    return 0
  }

  // 递增序列
  pairs.sort((next, pre) => next[1] - pre[1])

  let tar = 0
  // 一维空间转换为常量
  let dp = 1
  for (let i = 1; i < max; i++) {
    if (pairs[i][0] > pairs[tar][1]) {
      dp++
      tar = i
    }
  }
  return dp
}
```