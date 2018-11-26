# JavaScript刷LeetCode -- 935.Knight Dialer

### 一、题目

  A chess knight can move as indicated in the chess diagram below:

  ![](https://assets.leetcode.com/uploads/2018/10/12/knight.png)

  ![](https://assets.leetcode.com/uploads/2018/10/30/keypad.png)

  This time, we place our chess knight on any numbered key of a phone pad (indicated above), and the knight makes N-1 hops.  Each hop must be from one key to another numbered key.

  Each time it lands on a key (including the initial placement of the knight), it presses the number of that key, pressing N digits total.

  How many distinct numbers can you dial in this manner?

  Since the answer may be large, output the answer modulo 10^9 + 7.

### 二、题目大意

  通过图一中knight跳动的方式跳跃N-1次来拨号一共有多少种方式。

### 三、解题思路

  这是一道典型的动态规划题目，可以将拨号盘转化为一个二维数组，那么第N次每个拨号键所产生的方式记为:

```s
  dp[N-1][i][j]
```

  考虑N=1时的边界条件：

```s
  dp[0][*][*] = 1
```

  当N=2时，knight则需要跳一次，例如当knight在1处，可以跳向6或者8，由此我们可以得到在拨号键1处的递推公式:

```s
  dp[N][0][0] = dp[N-1][1][2] + dp[N-1][2][1]
```

  同样我们可以归纳出其余拨号键的递推公式。

  对于这样一个三维结构可以采取降维的方式，首先对于这个固定的二维拨号键可以转换为一维数组，而对于N可以通过前后状态数组的交换转换为常量。

### 四、代码

```JavaScript
const max = Math.pow(10, 9) + 7
  // 将二维空间压缩成一维空间
  let init = [1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0]
  if (N <= 0) {
    return 0
  }
  if (N === 1) {
    return sum(init)
  }

  let dp = []
  for (let i = 0; i < N -1; i++) {
    for (let j = 0; j < init.length; j++) {
      switch (j) {
        case 9:
          break
        case 11:
          dp[j] = 0
          break
        case 0:
          dp[j] = (init[7] + init[5]) % max
          break
        case 1:
          dp[j] = (init[6] + init[8]) % max
          break
        case 2:
          dp[j] = (init[3] + init[7]) % max
          break
        case 3:
          dp[j] = (init[2] + init[8] + init[10]) % max
          break;
        case 4:
          dp[j] = 0
          break
        case 5:
          dp[j] = (init[0] + init[6] + init[10]) % max
          break
        case 6:
          dp[j] = (init[1] + init[5]) % max
          break
        case 7:
          dp[j] = (init[0] + init[2]) % max
          break
        case 8:
          dp[j] = (init[1] + init[3]) % max
          break
        case 10:
          dp[j] = (init[3] + init[5]) % max
      }
    }
    // 交换数组
    init = dp
    dp = []
  }

  return sum(init)
  function sum (data) {
    return (data.reduce((pre, cur) => cur += pre, 0)) % max
  }
}
```

