# JavaScript刷LeetCode -- 235. Lowest Common Ancestor of a Binary Search Tree

#### 一、题目

  &emsp;&emsp;Given a binary search tree (BST), find the lowest common ancestor (LCA) of two given nodes in the BST.

  &emsp;&emsp;According to the definition of LCA on Wikipedia: “The lowest common ancestor is defined between two nodes p and q as the lowest node in T that has both p and q as descendants (where we allow a node to be a descendant of itself).”

#### 二、题目大意

  &emsp;&emsp;找出p,q两个节点的最低公共父节点，公共父节点可以是这两个节点自身。

#### 三、解题思路

  &emsp;&emsp;分析题目可以知道本题的结果只有两种情况：

  - p,q分别处于左右子树上，那么最低公共父节点就是左右子树的根节点。
  - p,q处于同一棵子树上，那么最低公共父节点就是p,q中最低的那个节点。

  &emsp;&emsp;那么根据BST的特性可以判断这两个节点的分布情况，再结合递归处理即可得到答案。

#### 四、代码实现

```JavaScript
const lowestCommonAncestor = (root, p, q) => {
  if (!root) {
    return null
  }

  if (p.val < root.val && q.val < root.val) {
    return lowestCommonAncestor(root.left, p, q)
  } else if (p.val > root.val && q.val > root.val) {
    return lowestCommonAncestor(root.right, p, q)
  } else {
    return root
  }
}
```