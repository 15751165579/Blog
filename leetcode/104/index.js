/**
 * Maximum Depth of Binary Tree
 */

function TreeNode (val) {
  this.val = val
  this.left = this.right = null
}
const maxDepth = function (root) {
  if (root === null) {
    return 0
  }
  return Math.max(maxDepth(root.left), maxDepth(root.right)) + 1
}