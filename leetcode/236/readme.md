# JavaScript刷LeetCode -- 236. Lowest Common Ancestor of a Binary Tree

#### 一、题目

  &emsp;&emsp;Given a binary tree, find the lowest common ancestor (LCA) of two given nodes in the tree.

  &emsp;&emsp;According to the definition of LCA on Wikipedia: “The lowest common ancestor is defined between two nodes p and q as the lowest node in T that has both p and q as descendants (where we allow a node to be a descendant of itself).”

#### 二、题目大意

  &emsp;&emsp;找出两个节点的最低公共祖先节点，允许这两个节点自身为公共祖先节点。

#### 三、解题思路

  &emsp;&emsp;对于这个问题只有两种情况：

  - 当这两个节点处于不同的左右子树中时，那么最低公共祖先节点就是这两棵左右子树的根节点；
  - 当这两个节点处于同一子树中，那么最低公共祖先节点就是这两个节点中最低的那个节点。

#### 四、代码实现

```JavaScript
const lowestCommonAncestor = (root, p, q) => {
  if (!root || root == p || root == q) {
    return root
  }
  const left = lowestCommonAncestor(root.left, p, q)
  const right = lowestCommonAncestor(root.right, p, q)

  if (left && right) {
    return root
  }
  return left ? left : right
}
```