# JavaScript刷LeetCode -- 910. Smallest Range II

#### 一、题目

  Given an array A of integers, for each integer A[i] we need to choose either x = -K or x = K, and add x to A[i] (only once).

  After this process, we have some array B.

  Return the smallest possible difference between the maximum value of B and the minimum value of B.

#### 二、题目大意

  给定一个数组A，必须对A中的每一个元素执行+K或者-K的操作，这样可以得到一个新的数组B，求出B中最大值与最小值的差值最小可能是多少？

#### 三、解题思路

  解决这个问题的两个要点：

 - 每个元素都必须执行+k或者-k的操作，这里可以转换一下思路，将每个元素先执行-k操作，那么问题就转换成了将部分元素执行+2k的问题，而题目中求的是差值，所以不将每一个元素都执行-k操作也是没问题的。
 - 执行完操作之后，仍需要找出最大值和最小值，那么可以先将原数组排序，然后遍历数组给元素加上2k，又因为数组已经有序，那么最大值则存在于:

 ```JavaScript
  max = Math.max(A[max - 1], A[i] + 2 * K)
  min = Math.min(A[i + 1], A[0] + 2 * K)
 ```

 #### 四、代码实现

 ```JavaScript
 const smallestRangeII = (A, K) => {
  A.sort((a, b) => a - b)
  const max = A.length
  let ans = A[max - 1] - A[0]
  for (let i = 0; i < max - 1; i++) {
    ans = Math.min(ans, Math.max(A[max - 1], A[i] + 2 * K) - Math.min(A[i + 1], A[0] + 2 * K))
  }
  return ans
}
 ```
  