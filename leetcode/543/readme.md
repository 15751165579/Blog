# JavaScript刷LeetCode -- 543. Diameter of Binary Tree

#### 一、题目

  &emsp;&emsp;Given a binary tree, you need to compute the length of the diameter of the tree. The diameter of a binary tree is the length of the longest path between any two nodes in a tree. This path may or may not pass through the root.

```s
  Example:
  Given a binary tree 
           1
          / \
         2   3
        / \     
       4   5    
  Return 3, which is the length of the path [4,2,1,3] or [5,2,1,3].
```

#### 二、题目大意

  &emsp;&emsp;找出任意两个节点最长路径的长度。

#### 三、解题思路

  &emsp;&emsp;这道题本质是求解二叉树高度，唯一的区别在于：二叉树的最长路径由左子树最大高度加上右子树最大高度组成。

#### 四、代码实现

```JavaScript
const diameterOfBinaryTree = root => {
  let sum = 0
  postOrder(root)
  return sum
  function postOrder (root) {
    if (!root) {
      return 0
    }
    const left = postOrder(root.left)
    const right = postOrder(root.right)
    sum = Math.max(sum, left + right)
    return Math.max(right, left) + 1
  }
}
```