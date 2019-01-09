# JavaScript刷LeetCode -- 951. Flip Equivalent Binary Trees [Medium]

#### 一、题目

  &emsp;&emsp;For a binary tree T, we can define a flip operation as follows: choose any node, and swap the left and right child subtrees.

  &emsp;&emsp;A binary tree X is flip equivalent to a binary tree Y if and only if we can make X equal to Y after some number of flip operations.

  &emsp;&emsp;Write a function that determines whether two binary trees are flip equivalent.  The trees are given by root nodes root1 and root2.

#### 二、题目大意

  &emsp;&emsp;判断一棵二叉树是不是由另一棵二叉树的部分节点交换左右子树得到的。

#### 三、解题思路

  &emsp;&emsp;主要思路还是采用递归的思想，判断二叉树中每个节点的左右子树是否满足该条件，判断节点子树是否满足的条件有：

  - 如果两个节点都为空，显然满足。
  - 如果两个节点的值不相等，显然不满足。
  - 如果两个节点的值相等时，就需要采用递推公式

```s
  flipEquiv(root1.left, root2.left) && flipEquiv(root1.right, root2.right)) || (flipEquiv(root1.left, root2.right) && flipEquiv(root1.right, root2.left)
```

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
    return (flipEquiv(root1.left, root2.left) && flipEquiv(root1.right, root2.right)) || (flipEquiv(root1.left, root2.right) && flipEquiv(root1.right, root2.left))
  } else {
    return false
  }
}
```