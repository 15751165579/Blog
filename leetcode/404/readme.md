# JavaScript刷LeetCode -- 404. Sum of Left Leaves

#### 一、题目

  &emsp;&emsp;Find the sum of all left leaves in a given binary tree.

#### 二、题目大意

  &emsp;&emsp;计算二叉树左叶子节点的和值。

#### 三、解题思路

  &emsp;&emsp;递归收集左叶子节点的和值。

#### 四、代码实现

```JavaScript
const sumOfLeftLeaves = root => {
  let sum = 0
  if (!root) {
    return sum
  }

  if (root.left && !root.left.left && !root.left.right) {
    sum += root.left.val
  }

  sum += sumOfLeftLeaves(root.left)
  sum += sumOfLeftLeaves(root.right)

  return sum
}
```