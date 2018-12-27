# JavaScript刷LeetCode -- 98. Validate Binary Search Tree

#### 一、题目

  &emsp;&emsp;Given a binary tree, determine if it is a valid binary search tree (BST).

  &emsp;&emsp;Assume a BST is defined as follows:

  - The left subtree of a node contains only nodes with keys less than the node's key.
  - The right subtree of a node contains only nodes with keys greater than the node's key.
  - Both the left and right subtrees must also be binary search trees.

#### 二、题目大意

  &emsp;&emsp;验证一棵二叉树是否为二叉搜索树。

#### 三、解题思路

  &emsp;&emsp;递归遍历出该二叉树的中序遍历数组，判断该数组是否为单调递增数组。

#### 四、代码实现

```JavaScript
const isValidBST = root => {
  const ans = []
  help(root)
  for (let i = 0, max = ans.length; i < max - 1; i++) {
    const pre = ans[i]
    const next = ans[i + 1]
    if (next <= pre) {
      return false
    }
  }
  return true
  function help (root) {
    if (!root) {
      return
    }
    help(root.left)
    ans.push(root.val)
    help(root.right)
  }
}
```