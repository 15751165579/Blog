/* eslint-disable */
const sumOfLeftLeaves = root => {
  let sum = 0
  if (!root) {
    return sum
  }

  if (root.left && !root.left.left && !root.left.right) {
    sum += root.left.val
  }

  sum += sumOfLeftLeaves(root.left)
  sum += sumOfLeftLeaves(root.right)

  return sum
}