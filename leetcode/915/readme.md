# JavaScript刷LeetCode -- 915. Partition Array into Disjoint Intervals

#### 一、题目

  Given an array A, partition it into two (contiguous) subarrays left and right so that:

  - Every element in left is less than or equal to every element in right.
  - left and right are non-empty.
  - left has the smallest possible size.

  Return the length of left after such a partitioning.  It is guaranteed that such a partitioning exists.

#### 二、题目大意

  找出一个分割点将数组A分为左右两部分，这两部分必须满足：

  - 左边部分的元素都小于右边的元素
  - 每部分至少有一个元素


  求出这个分割点的最小下标值

#### 三、解题思路

  理解这道题目的意思之后，可以通过动态规划记录从左到右的最大值，从右到左的最小值。比较两个数组，找出第一次满足上述条件的下标即为本题的答案。

#### 四、代码实现

```JavaScript
const partitionDisjoint = A => {
  const len = A.length

  // 左边的最大值 应该小于右边的最小值
  const max = []
  max[0] = Number.MIN_SAFE_INTEGER
  const min = []
  min[0] = Number.MAX_SAFE_INTEGER

  for (let i = 0; i < len - 1; i++) {
    max[i + 1] = Math.max(max[i], A[i])
    min[i + 1] = Math.min(min[i], A[len - 1 - i])
  }

  let ans
  for (let i = 1; i < len; i++) {
    const start = max[i]
    const end = min[len - i]
    if (start <= end) {
      ans = i
      break
    }
  }
  return ans
}
```