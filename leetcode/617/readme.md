# JavaScript刷LeetCode -- 617. Merge Two Binary Trees

#### 一、题目

  Given two binary trees and imagine that when you put one of them to cover the other, some nodes of the two trees are overlapped while the others are not.

  You need to merge them into a new binary tree. The merge rule is that if two nodes overlap, then sum node values up as the new value of the merged node. Otherwise, the NOT null node will be used as the node of new tree.

#### 二、题目大意

  将两颗二叉树合并，如果节点重合，则新的节点取两个节点的和值。

#### 三、解题思路

  递归。

#### 四、代码实现

```JavaScript
var mergeTrees = (t1, t2) => {
  if (!t1) {
    return t2
  }
  if (!t2) {
    return t1
  }
  const root = new TreeNode(t1.val + t2.val)
  root.left = mergeTrees(t1.left, t2.left)
  root.right = mergeTrees(t1.right, t2.right)

  return root
}
```