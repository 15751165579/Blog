/* eslint-disable */
const buildTree = (inorder, postorder) => {
  if (!inorder) {
    return null
  }

  const val = postorder.pop()
  const root = new TreeNode(val)
  const index = inorder.indexOf(val)
  root.left = buildTree(inorder.slice(0, index), postorder.slice(0, index))
  root.right = buildTree(inorder.slice(index + 1), postorder.slice(index))
  return root
}