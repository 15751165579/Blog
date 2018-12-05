# JavaScript刷LeetCode -- 918. Maximum Sum Circular Subarray

#### 一、题目

  Given a circular array C of integers represented by A, find the maximum possible sum of a non-empty subarray of C.

  Here, a circular array means the end of the array connects to the beginning of the array.  (Formally, C[i] = A[i] when 0 <= i < A.length, and C[i+A.length] = C[i] when i >= 0.)

  Also, a subarray may only include each element of the fixed buffer A at most once.  (Formally, for a subarray C[i], C[i+1], ..., C[j], there does not exist i <= k1, k2 <= j with k1 % A.length = k2 % A.length.)

#### 二、题目大意

  数组A是一个环形数组，求解最大子数组的和，并且子数组必须有一个元素。

#### 三、解题思路

  这道题和求最大子串的题目有点类似，通过动态规划可以轻松的求出最大子串的和，但是这里的最大值可能存在于 A[0 - i] + A[j - max]：
  ![](https://assets.leetcode.com/users/motorix/image_1538888300.png)

#### 四、代码实现

```JavaScript
const maxSubarraySumCircular = (A) => {
  let total = A[0]
  let dpmax = A[0]
  let dpmin = A[0]

  let max = A[0]
  let min = A[0]

  for (let i = 1; i < A.length; i++) {
    const item = A[i]
    total += item
    dpmax = Math.max(item, dpmax + item)
    dpmin = Math.min(item, dpmin + item)

    max = Math.max(dpmax, max)
    min = Math.min(dpmin, min)
  }
  return max > 0 ? Math.max(max, total - min) : max
}
```

