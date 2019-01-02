# JavaScript刷LeetCode -- 96. Unique Binary Search Trees

#### 一、题目

  &emsp;&emsp;Given n, how many structurally unique BST's (binary search trees) that store values 1 ... n?

#### 二、题目大意

  &emsp;&emsp;给定一个整数n，通过1~n的序列可以构建多少颗不同的二叉搜索树。

#### 三、解题思路

  &emsp;&emsp;这道题目采用动态规划解决，提到动态规划首先需要定义状态：dp[n]表示n个节点可以构建的二叉搜索树的数目。

  &emsp;&emsp;接下来就是状态转移公式。

  &emsp;&emsp;当n=1时：

```s
  n = 1

  dp[1] = 1
```

  &emsp;&emsp;当n=2时：

```s
  n = 2

  1      2
   \    /
    2  1

  dp[2] = 2
```

  &emsp;&emsp;当n=3时:

```s
  n = 3

  1       1        2      3       3         
   \       \      / \    /       /
    2       3    1   3  1       2
     \     /             \     /
      3   2               2   1

  dp[3] = 5
```

  &emsp;&emsp;如果你观察地仔细，那么可以将上述三种情况归纳为：

```s
  dp[1] = dp[0] * dp[0]

  dp[2] = dp[0] * dp[1] + dp[1] * dp[0]

  dp[3] = dp[0] * dp[2] + dp[1] * dp[1] + dp[2] * dp[0]
```

  &emsp;&emsp;所以这里不仅仅得到了递推公式，而且还需要再定义一个初始状态dp[0] = 1。

#### 四、代码实现

```JavaScript
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
```