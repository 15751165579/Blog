# JavaScript刷LeetCode -- 94. Binary Tree Inorder Traversal【Medium】

#### 一、题目

  &emsp;&emsp;Given a binary tree, return the inorder traversal of its nodes' values.

#### 二、题目大意

  &emsp;&emsp;二叉树的中序遍历。

#### 三、解题思路

  &emsp;&emsp;递归

#### 四、代码实现

```JavaScript
const inorderTraversal = root => {
  const ans = []
  help(root)
  return ans
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