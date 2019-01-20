# JavaScript刷LeetCode -- 111. Minimum Depth of Binary Tree

#### 一、题目

  &emsp;&emsp;Given a binary tree, find its minimum depth.

  &emsp;&emsp;The minimum depth is the number of nodes along the shortest path from the root node down to the nearest leaf node.

#### 二、题目大意

  &emsp;&emsp;找出二叉树中根节点到叶子节点的最小长度。

#### 三、解题思路

  &emsp;&emsp;这道题类似【104. Maximum Depth of Binary Tree】。

  &emsp;&emsp;但是需要注意边界情况（单个左右子树）的处理。

#### 四、解题思路

```JavaScript
const minDepth = function (root) {
  if (!root) {
    return 0
  }

  if (!root.left) {
    return minDepth(root.right) + 1
  }
  if (!root.right) {
    return minDepth(root.left) + 1
  }

  return Math.min(minDepth(root.left), minDepth(root.right)) + 1
}
```