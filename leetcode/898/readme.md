# JavaScript刷LeetCode -- 898. Bitwise ORs of Subarrays

#### 一、题目

  We have an array A of non-negative integers.

  For every (contiguous) subarray B = [A[i], A[i+1], ..., A[j]] (with i <= j), we take the bitwise OR of all the elements in B, obtaining a result A[i] | A[i+1] | ... | A[j].

  Return the number of possible results.  (Results that occur more than once are only counted once in the final answer.)

  0 <= A[i] <= 10^9

#### 二、题目大意

  给定一个非负整数数组A，从A中找出所有子数组，将每个子数组中的元素进行位或操作，求出互相不相同的元素有多少个？

#### 三、解题思路

  首先可以采用一波暴力解法：

```JavaScript
const subarrayBitwiseORs = (A) => {

  const max = A.length
  const x = new Set()

  for (let i = 0; i < max; i++) {
    let item = A[i]
    x.add(item)
    for (let j = i + 1; j < max; j++) {
      item = item | A[j]
      x.add(item)
    }
  }
  return x.size
}
```

  意料之中的超时，这时我们需要思考的就是如何将O(n^2)转化为O(n)，对于A[i]最多可以用30位表示，那么如果通过set记录前一次集合，那么最多就是30个元素，利用这一点就可以将时间复杂度降低为O(30n):


#### 四、代码实现

```JavaScript
const subarrayBitwiseORs1 = (A) => {

  let cur = new Set()
  const ans = new Set()

  for (let i = 0; i < A.length; i++) {
    const item = A[i]
    const x = new Set()
    for (let e of cur.values()) {
      x.add(e | item)
    }
    x.add(item)
    cur = x
    for (let sub of cur.values()) {
      ans.add(sub)
    }
  }

  return ans.size
}
```