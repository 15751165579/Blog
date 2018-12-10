# JavaScript刷LeetCode -- 907. Sum of Subarray Minimums

#### 一、题目

  Given an array of integers A, find the sum of min(B), where B ranges over every (contiguous) subarray of A.

  Since the answer may be large, return the answer modulo 10^9 + 7.

  - 1 <= A.length <= 30000
  - 1 <= A[i] <= 30000

#### 二、题目大意

  对于给定的整型数组A，找出A的所有子数组，输出这些子数组中最小值的和。（值可能非常的大，需要对10^9+7取模运算）

#### 三、解题思路

  这道题很容易想出的思路就是找出所有的组合， 然后求解最小值的和：

```JavaScript
const sumSubarrayMins = A => {
  const max = A.length

  const MAX = 10 ** 9 + 7

  let ans = 0

  for (let i = 0; i < max; i++) {
    let end = i
    let min = Number.MAX_SAFE_INTEGER
    while (end >= 0) {
      min = Math.min(min, A[end])
      ans = (ans + min) % MAX
      end--
    }
  }

  return ans % MAX
}
```

  但是由于数组A的长度限制，这种方法一定会超时。这时就需要转化一下思路:

```s
  # 以 [3, 1, 2, 4] 为例

  # 找出所有组合的最小值为1的情况：

  [3, 1]
  [1]
  [3, 1, 2]
  [1, 2]
  [1, 2, 4]
  [3, 1, 2, 4]

```

  那么只要算出以1为最小值的组合的个数即可：

```s
  # 首先找出1左边可以和其结合的元素

  left = [3]

  # 再找出1右边可以和其结合的元素
  right = [2, 4]

  # 那么以1为最小值的组合的个数为：
 
  count = len(left) + len(right) + len(left) * len(right) + 1
```

#### 四、代码实现

```JavaScript
const sumSubarrayMins1 = A => {
  const MAX = 10 ** 9 + 7
  const max = A.length
  let ans = 0

  const left = []

  for (let i = 0; i < max; i++) {
    let end = i
    const item = A[i]
    while (--end >= 0) {
      if (A[end] >= item) {
        continue
      } else {
        break
      }
    }
    left[i] = i - end - 1
  }
  
  const right = []

  for (let i = 0; i < max; i++) {
    let end = i
    const item = A[i]
    while (++end < max) {
      if (A[end] > item) {
        continue
      } else {
        break
      }
    }
    right[i] = end - i - 1
  }
  for (let i = 0; i < max; i++) {
    const l = left[i]
    const r = right[i]
    ans = (ans + ((l + r + l * r + 1) * A[i]) % MAX) % MAX
  }
  return ans
}
```

