# JavaScript刷LeetCode -- 110. Balanced Binary Tree

#### 一、题目

&emsp;&emsp;Given a binary tree, determine if it is height-balanced.

&emsp;&emsp;For this problem, a height-balanced binary tree is defined as:

&emsp;&emsp;a binary tree in which the depth of the two subtrees of every node never differ by more than 1.

```s
Example 1:

Given the following tree [3,9,20,null,null,15,7]:

    3
   / \
  9  20
    /  \
   15   7
Return true.

Example 2:

Given the following tree [1,2,2,3,3,null,null,4,4]:

       1
      / \
     2   2
    / \
   3   3
  / \
 4   4
```

#### 二、题目大意

  一颗二叉树是否满足每个节点的两颗子树的高度差值不超过1。

#### 三、解题思路

  首先需要通过递归的方式求解出二叉树的高度，再递归的去判断二叉树的每个节点的两个子树是否高度之差不超过1。

#### 四、代码实现

```JavaScript
const isBalanced = function (root) {

  if (!root) {
    return true
  }

  const left = height(root.left)
  const right = height(root.right)

  return Math.abs(left - right) <= 1 && isBalanced(root.left) && isBalanced(root.right)

  function height (root) {
    if (!root) {
      return 0
    }
    return Math.max(height(root.left), height(root.right)) + 1
  }
}
```