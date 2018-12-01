# JavaScript刷LeetCode -- 926. Flip String to Monotone Increasing

#### 一、题目

  A string of '0's and '1's is monotone increasing if it consists of some number of '0's (possibly 0), followed by some number of '1's (also possibly 0.)

  We are given a string S of '0's and '1's, and we may flip any '0' to a '1' or a '1' to a '0'.

  Return the minimum number of flips to make S monotone increasing.

#### 二、题目大意

  一个由‘0’和‘1’组成的字符串，可以通过将‘0’替换成‘1’，或者将‘1’替换成‘0’，使得整个字符串单调递增的最小操作次数是多少？

#### 三、解题思路

  因为字符串中只含有0和1两种元素，所以构成字符串单调递增的情况为：左边为0右边为1。

```s

  l[i]: 表示 1 到 i 全部为0需要的操作数

  r[i]: 表示 max - i 到 max 全部为1需要的操作数

  那么形成一个单调递增所需要的操作数为： l[i] + r[max - i]
  
  只要比较所有的结果即可得到最小操作数。
```

#### 四、代码实现

```JavaScript
const minFlipsMonoIncr = (S) => {
  const max = S.length

  if (max <= 1) {
    return 0
  }

  // l[i] 表示 0 ~ i 为0的情况
  let l = []
  l[0] = 0 // 左边没有0
  for (let i = 1; i <= max; i++) {
    const item = S[i - 1] // 注意下标
    l[i] = l[i - 1] + (item === '1' ? 1 : 0)
  }

  // r[i] 表示后 max - 1 - i ~ max - 1 为1的情况
  let r = []
  r[0] = 0 // 右边没有1
  for (let i = 1; i <= max; i++) {
    const item = S[max - i] // 注意下标
    r[i] = r[i - 1] + (item === '1' ? 0 : 1)
  }

  let min = Number.MAX_SAFE_INTEGER
  for (let i = 0; i <= max ; i++) {
    const lItem = l[i]
    const rItem = r[max - i]
    min = Math.min(rItem + lItem, min)
  }
  return min
}
```