# JavaScript刷LeetCode -- 971. Flip Binary Tree To Match Preorder Traversal [Medium]

#### 一、题目

  &emsp;&emsp;Given a binary tree with N nodes, each node has a different value from {1, ..., N}.

  &emsp;&emsp;A node in this binary tree can be flipped by swapping the left child and the right child of that node.

  &emsp;&emsp;Consider the sequence of N values reported by a preorder traversal starting from the root.  Call such a sequence of N values the voyage of the tree.

  &emsp;&emsp;(Recall that a preorder traversal of a node means we report the current node's value, then preorder-traverse the left child, then preorder-traverse the right child.)

  &emsp;&emsp;Our goal is to flip the least number of nodes in the tree so that the voyage of the tree matches the voyage we are given.

  &emsp;&emsp;If we can do so, then return a list of the values of all nodes flipped.  You may return the answer in any order.

  &emsp;&emsp;If we cannot do so, then return the list [-1].

#### 二、题目大意

  &emsp;&emsp;给定一棵二叉树，能够通过翻转节点的左右子节点得到一个前序序列voyage，返回翻转节点的集合，否则返回[-1]。

#### 三、解题思路

  &emsp;&emsp;这道题实际上就是对于前序遍历二叉树的扩展，在前序遍历的过程中与voyage数组中的节点进行比较。

#### 四、代码实现

```JavaScript
const flipMatchVoyage = (root, voyage) => {
  let ans = []
  // 记录访问到第几个节点
  let position = 0

  help(root, voyage, position)

  return ans

  function help (root, voyage) {
    if (!root) {
      return
    }
    if (root.val !== voyage[position++]) {
      ans = [-1]
      return
    }

    if (root.left && root.left.val !== voyage[position]) {
      // 更改遍历顺序达到交换左右子树的效果
      ans.push(root.val)
      help(root.right, voyage)
      help(root.left, voyage)
    } else {
      help(root.left, voyage)
      help(root.right, voyage)
    }
  }
}
```