/**
 * Maximum Depth of Binary Tree
 */
/* eslint-disable */
const maxDepth = root => {
  if (!root) {
    return 0
  }
  return Math.max(maxDepth(root.left), maxDepth(root.right)) + 1
}