// Merge Two Binary Trees
/* eslint-disable */
var mergeTrees = (t1, t2) => {
  if (!t1) {
    return t2
  }
  if (!t2) {
    return t1
  }
  const root = new TreeNode(t1.val + t2.val)
  root.left = mergeTrees(t1.left, t2.left)
  root.right = mergeTrees(t1.right, t2.right)

  return root
}