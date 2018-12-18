# JavaScript刷LeetCode -- 104. Maximum Depth of Binary Tree

#### 一、题目

  &emsp;&emsp;Given a binary tree, find its maximum depth.

  &emsp;&emsp;The maximum depth is the number of nodes along the longest path from the root node down to the farthest leaf node.

#### 二、题目大意

  &emsp;&emsp;求出二叉树的高度

#### 三、解题思路

  &emsp;&emsp;老套路，递归。

#### 四、代码实现

```JavaScript
const maxDepth = root => {
  if (!root) {
    return 0
  }
  return Math.max(maxDepth(root.left), maxDepth(root.right)) + 1
}
```