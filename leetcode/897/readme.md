# JavaScript刷LeetCode -- 897. Increasing Order Search Tree

#### 一、解题思路

  &emsp;&emsp;根据BST的特性，先采用中序遍历方式获取到递增序列，再构建要求的二叉树。

#### 二、代码实现

```JavaScript
const increasingBST = root => {
  if (!root) {
    return null
  }

  const ans = []
  inOrder(root)
  const tree = new TreeNode(ans[0])
  let pre = tree
  for (let i = 1, max = ans.length; i < max; i++) {
    pre.right = new TreeNode(ans[i])
    pre = pre.right
  }
  return tree
  function inOrder (root) {
    if (!root) {
      return
    }
    inOrder(root.left)
    ans.push(root.val)
    inOrder(root.right)
  }
}
```