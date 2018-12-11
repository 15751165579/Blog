# JavaScript刷LeetCode -- 904. Fruit Into Baskets

#### 一、题目

  In a row of trees, the i-th tree produces fruit with type tree[i].

  You start at any tree of your choice, then repeatedly perform the following steps:

  Add one piece of fruit from this tree to your baskets.  If you cannot, stop.
  Move to the next tree to the right of the current tree.  If there is no tree to the right, stop.
  Note that you do not have any choice after the initial choice of starting tree: you must perform step 1, then step 2, then back to step 1, then step 2, and so on until you stop.

  You have two baskets, and each basket can carry any quantity of fruit, but you want each basket to only carry one type of fruit each.

  What is the total amount of fruit you can collect with this procedure?

#### 二、题目大意

  找出数组tree中最长的子数组，并且子数组中只含有两个不同的元素。

#### 三、解题思路

  理解题目之后，思路还是很简单的：遍历数组，记录只含有两个元素的子数组的长度，当子数组不满足要求时，向前遍历找出下一个子数组的起始点。

#### 四、代码实现

```JavaScript
const totalFruit = tree => {
  const max = tree.length

  const s = new Set()

  let ans = Number.MIN_SAFE_INTEGER
  let sum = 0

  for (let i = 0; i < max; i++) {
    const type = tree[i]
    if (s.size < 2) {
      s.add(type)
      sum++
      continue
    }

    if (s.has(type)) {
      sum++
    } else {
      ans = Math.max(ans, sum)
      let start = i - 1
      while (start > 0) {
        const cur = tree[start]
        const pre = tree[start - 1]
        if (cur === pre) {
          start--
        } else {
          break
        }
      }
      sum = i - start + 1
      s.clear()
      s.add(type)
      s.add(tree[i - 1])
    }
  }

  ans = Math.max(ans, sum)
  return ans
}
```