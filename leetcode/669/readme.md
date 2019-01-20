# JavaScript刷LeetCode -- 669. Trim a Binary Search Tree

#### 一、题目

  &emsp;&emsp;Given a binary search tree and the lowest and highest boundaries as L and R, trim the tree so that all its elements lies in [L, R] (R >= L). You might need to change the root of the tree, so the result should return the new root of the trimmed binary search tree.

#### 二、题目大意

  &emsp;&emsp;限定二叉搜索树的所有节点在[L, R]范围内，需要返回修剪后的二叉搜索树。

#### 三、解题思路

  &emsp;&emsp;根据BST的特性，可以判断节点分布于BST的左子树还是右子树，进行递归处理即可。

#### 四、代码实现

```JavaScript
const trimBST = (root, L, R) => {
  if (!root) {
    return null
  }
  if (root.val < L) {
    return trimBST(root.right, L, R)
  }
  if (root.val > R) {
    return trimBST(root.left, L, R)
  }
  root.left = trimBST(root.left, L, R)
  root.right = trimBST(root.right, L, R)
  return root
}
```