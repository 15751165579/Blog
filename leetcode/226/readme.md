# JavaScript刷LeetCode -- 226. Invert Binary Tree

#### 一、题目

  Invert a binary tree.

  Example:

  Input:

        4
      /   \
      2     7
    / \   / \
    1   3 6   9
  Output:

        4
      /   \
      7     2
    / \   / \
    9   6 3   1

#### 二、题目大意

  交换二叉树的左右节点

#### 三、解题思路

  递归交换左右节点

#### 四、代码实现

```JavaScript
const invertTree = (root) => {
  if (!root) {
    return root
  }
  const temp = root.left
  root.left = root.right
  root.right = temp
  invertTree(root.left)
  invertTree(root.right)
  return root
}
```