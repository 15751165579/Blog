# JavaScript刷LeetCode -- 105. Construct Binary Tree from Preorder and Inorder Traversal [Medium]

#### 一、题目

  &emsp;&emsp;Given preorder and inorder traversal of a tree, construct the binary tree.

  &emsp;&emsp;You may assume that duplicates do not exist in the tree.

#### 二、题目大意

  &emsp;&emsp;根据前序遍历序列和中序遍历序列构建二叉树，二叉树中每个节点的值都不相同。

#### 三、解题思路

  &emsp;&emsp;首先要知道二叉树的前序遍历和中序遍历：

```s
  前序遍历： 根 左 右
  中序遍历： 左 根 右
```

  &emsp;&emsp;仔细观察一波，可以发现从前序遍历序列中第一位就是当前子树的根，而通过这个根，可以将中序遍历序列分成左右两个子树。根据这一特性，就可以完成二叉树的递归构建。

#### 四、代码实现

```JavaScript
const buildTree = (preorder, inorder) => {
  if (preorder.length === 0) {
    return null
  }
  const rv = preorder.shift()
  const root = new TreeNode(rv)
  const index = inorder.indexOf(rv)

  root.left = buildTree(preorder.slice(0, index), inorder.slice(0, index))
  root.right = buildTree(preorder.slice(index), inorder.slice(index + 1))

  return root
}
```