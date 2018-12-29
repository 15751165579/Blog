# JavaScript刷LeetCode -- 145. Binary Tree Postorder Traversal【Medium】

#### 一、题目

  &emsp;&emsp;Given a binary tree, return the postorder traversal of its nodes' values.

#### 二、题目大意

  &emsp;&emsp;后序遍历二叉树。

#### 三、解题思路

  &emsp;&emsp;递归

#### 四、代码实现

```JavaScript
const postorderTraversal = root => {
  const ans = []
  help(root)
  return ans
  function help (root) {
    if (!root) {
      return
    }
    help(root.left)
    help(root.right)
    ans.push(root.val)
  }
}
```