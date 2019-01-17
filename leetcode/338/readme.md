# JavaScript刷LeetCode -- 338. Counting Bits [Medium]

#### 一、题目

  &emsp;&emsp;Given a non negative integer number num. For every numbers i in the range 0 ≤ i ≤ num calculate the number of 1's in their binary representation and return them as an array.

#### 二、题目大意

  &emsp;&emsp;给定一个非负整数num。对于0≤i≤num范围内的每个数字i，计算其二进制表示形式中的1个数，并将其作为数组返回。

#### 三、解题思路

  &emsp;&emsp;巧用位运算

#### 四、代码实现

```JavaScript
const countBits = num => {
  const dp = []
  dp[0] = 0
  for (let i = 1; i <= num; i++) {
    dp[i] = dp[i >> 1] + (i & 1)
  }
  return dp 
}
```