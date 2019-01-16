/* eslint-disable */

// preorder 根 左 右
// inorder 左 根 右

// 根据preorder 很容易找到跟， 然后在通过inorder 分割左右子树
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