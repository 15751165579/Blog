# JavaScript刷LeetCode -- 112. Path Sum

#### 一、题目

  &emsp;&emsp;Given a binary tree and a sum, determine if the tree has a root-to-leaf path such that adding up all the values along the path equals the given sum.

#### 二、题目大意

  &emsp;&emsp;判断二叉树中是否存在从根节点到叶子节点和值为sum的路径。

#### 三、解题思路

  &emsp;&emsp;递归处理，不断计算当前节点对应的sum值，当递归到叶子节点时，如果当前节点值与sum相等，则找到了这条路径，否则返回false。

#### 四、代码实现

```JavaScript
const hasPathSum = function (root, sum) {
  if (!root) {
    return false
  }

  if (!root.left && !root.right) {
    return root.val == sum
  }

  return hasPathSum(root.left, sum - root.val) || hasPathSum(root.right, sum - root.val)
}
```