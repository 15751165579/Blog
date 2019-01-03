# JavaScript刷LeetCode -- 897. Increasing Order Search Tree

#### 一、题目

  &emsp;&emsp;Given a tree, rearrange the tree in in-order so that the leftmost node in the tree is now the root of the tree, and every node has no left child and only 1 right child.

#### 二、题目大意

  &emsp;&emsp;给定一棵树，按顺序重新排列树，使树中最左边的节点现在是树的根，并且每个节点都没有左子节点，只有一个右子节点。

#### 三、解题思路

  &emsp;&emsp;中序遍历二叉树得到有序序列，重新构建二叉树。

#### 四、代码实现

```JavaScript
const increasingBST = root => {
  if (!root) {
    return null
  }

  const ans = []
  help(root)
  const tree = new TreeNode(ans[0])
  let pre = tree
  for (let i = 1, max = ans.length; i < max; i++) {
    pre.right = new TreeNode(ans[i])
    pre = pre.right
  }
  return tree
  function help (root) {
    if (!root) {
      return
    }
    help(root.left)
    ans.push(root.val)
    help(root.right)
  }
}
```