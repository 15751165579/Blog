/**
 * Path Sum
 */
const hasPathSum = function (root, sum) {
  if (!root) {
    return false
  }
  if (!root.left && !root.right) {
    return root.val === sum
  }
  const newSum = sum - root.val

  return hasPathSum(root.left, newSum) || hasPathSum(root.right, newSum)
}