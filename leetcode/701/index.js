/* eslint-disable */
const insertIntoBST = (root, val) => {
  if (!root) {
    return new TreeNode(val)
  }

  help(root)
  return root

  function help (root) {
    if (!root) {
      return
    }
    if (root.val > val) {
      // 应该在左子树
      if (!root.left) {
        root.left = new TreeNode(val)
        return
      }
      help(root.left)
    }

    if (root.val < val) {
      // 应该在右子树
      if (!root.right) {
        root.right = new TreeNode(val)
        return
      }
      help(root.right)
    }
  }
}