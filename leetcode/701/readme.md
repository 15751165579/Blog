# JavaScript刷LeetCode -- 701. Insert into a Binary Search Tree【Medium】

#### 一、题目

  &emsp;&emsp;Given the root node of a binary search tree (BST) and a value to be inserted into the tree, insert the value into the BST. Return the root node of the BST after the insertion. It is guaranteed that the new value does not exist in the original BST.

  &emsp;&emsp;Note that there may exist multiple valid ways for the insertion, as long as the tree remains a BST after insertion. You can return any of them.

#### 二、题目大意

  &emsp;&emsp;将给定的值正确地插入到BST中。

#### 三、解题思路

  &emsp;&emsp;递归二叉树，当前节点的值大于val，则val应该在当前节点的左子树，否则在右子树上，仅当所在的子树为空时，将val插入。

#### 四、代码实现

```JavaScript
const insertIntoBST = (root, val) => {
  if (!root) {
    return new TreeNode(val)
  }

  help(root)
  return root

  function help (root) {
    if (!root) {
      return
    }
    if (root.val > val) {
      // 应该在左子树
      if (!root.left) {
        root.left = new TreeNode(val)
        return
      }
      help(root.left)
    }

    if (root.val < val) {
      // 应该在右子树
      if (!root.right) {
        root.right = new TreeNode(val)
        return
      }
      help(root.right)
    }
  }
}
```