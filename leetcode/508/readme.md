# JavaScript刷LeetCode -- 508. Most Frequent Subtree Sum [Medium]

#### 一、题目

  &emsp;&emsp;Given the root of a tree, you are asked to find the most frequent subtree sum. The subtree sum of a node is defined as the sum of all the node values formed by the subtree rooted at that node (including the node itself). So what is the most frequent subtree sum value? If there is a tie, return all the values with the highest frequency in any order.

#### 二、题目大意

  &emsp;&emsp;求解所有子树中出现次数最多的和值。

#### 三、解题思路

  &emsp;&emsp;这道题目虽然是一道中等难度的题目，但是非常的简单，递归求解子树的和值，并记录该和值出现的次数即可。

#### 四、代码实现

```JavaScript
const findFrequentTreeSum = root => {

  const m = {}

  help(root)

  const max = Math.max.apply(this, Object.values(m))

  const ans = []
  for (let item in m) {
    if (m[item] === max) {
      ans.push(item)
    }
  }

  return ans

  function help (root) {
    if (!root) {
      return 0
    }

    const currentSum = root.val + help(root.left) + help(root.right)

    if (!m[currentSum]) {
      m[currentSum] = 0
    }
    m[currentSum]++

    return currentSum
  }
}
```