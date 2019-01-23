# JavaScript刷LeetCode -- 112. Path Sum

#### 一、题目

  &emsp;&emsp;Given a binary tree and a sum, determine if the tree has a root-to-leaf path such that adding up all the values along the path equals the given sum.

#### 二、题目大意

  &emsp;&emsp;判断二叉树中是否存在从根节点到叶子节点和值为sum的路径。

#### 三、解题思路

  &emsp;&emsp;在递归的过程中保存当前当前节点”剩余的和值“，以便于在叶子节点判断是否满足要求。

#### 四、代码实现

```JavaScript
const hasPathSum = function (root, sum) {
  if (!root) {
    return false
  }
  if (!root.left && !root.right) {
    return root.val === sum
  }
  const rest = sum - root.val
  const x = hasPathSum(root.left, rest)
  const y = hasPathSum(root.right, rest)
  return x || y
}
```