# JavaScript刷LeetCode -- 700. Search in a Binary Search Tree

#### 一、题目

  Given the root node of a binary search tree (BST) and a value. You need to find the node in the BST that the node's value equals the given value. Return the subtree rooted with that node. If 
  
  such node doesn't exist, you should return NULL.

#### 二、题目大意

  在二叉搜索树中找出指定节点，并且返回以该节点为根的字树，如果不存在则返回null

#### 三、解题思路

  递归。

#### 四、代码实现

```JavaScript
const searchBST = (root, val) => {
  if (root && root.val === val) {
    return root
  }

  if (!root) {
    return null
  }

  const left = searchBST(root.left, val)
  const right = searchBST(root.right, val)

  return left || right
}
```