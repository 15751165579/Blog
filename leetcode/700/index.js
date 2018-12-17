/* eslint-disable */
const searchBST = (root, val) => {
  if (root && root.val === val) {
    return root
  }

  if (!root) {
    return null
  }

  const left = searchBST(root.left, val)
  const right = searchBST(root.right, val)

  return left || right
}