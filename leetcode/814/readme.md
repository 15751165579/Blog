# JavaScript刷LeetCode -- 814. Binary Tree Pruning【Medium】  

#### 一、题目

&emsp;&emsp;We are given the head node root of a binary tree, where additionally every node's value is either a 0 or a 1.

&emsp;&emsp;Return the same tree where every subtree (of the given tree) not containing a 1 has been removed.

&emsp;&emsp;(Recall that the subtree of a node X is X, plus every node that is a descendant of X.)

#### 二、题目大意

  &emsp;&emsp;给定一个二叉树，如果二叉树的子树中不包含1则删除，返回新的子树。

#### 三、解题思路

  &emsp;&emsp;采用递归的方法，在递归的过程中，需要判断当前子树是保留还是删除：

```s
  (root.val == 1 || root.left != null || root.right != null) ? root : null
```

#### 四、代码实现

```JavaScript
const pruneTree = root => {
  if (!root) {
    return null
  }
  root.left = pruneTree(root.left)
  root.right = pruneTree(root.right)
  return (root.val == 1 || root.left != null || root.right != null) ? root : null
}
```