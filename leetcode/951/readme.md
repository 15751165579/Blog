# JavaScript刷LeetCode -- 951. Flip Equivalent Binary Trees [Medium]

#### 一、题目

  &emsp;&emsp;For a binary tree T, we can define a flip operation as follows: choose any node, and swap the left and right child subtrees.

  &emsp;&emsp;A binary tree X is flip equivalent to a binary tree Y if and only if we can make X equal to Y after some number of flip operations.

  &emsp;&emsp;Write a function that determines whether two binary trees are flip equivalent.  The trees are given by root nodes root1 and root2.

#### 二、题目大意

  &emsp;&emsp;判断一棵二叉树是不是由另一棵二叉树的部分节点交换左右子树得到的。

#### 三、解题思路

  &emsp;&emsp;递归。


#### 四、代码实现

```JavaScript
const flipEquiv = (root1, root2) => {
  if (!root1 && !root2) {
    return true
  }
  if (!root1 || !root2) {
    return false
  }

  if (root1.val === root2.val) {
    const x = flipEquiv(root1.left, root2.left)
    const y = flipEquiv(root1.right, root2.right)
    const z = flipEquiv(root1.left, root2.right)
    const k = flipEquiv(root1.right, root2.left)
    return (x && y || z && k)
  } else {
    return false
  }
}
```