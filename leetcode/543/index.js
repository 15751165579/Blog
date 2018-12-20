/* eslint-disable */
const diameterOfBinaryTree = root => {
  let sum = 0
  help(root)
  return sum
  function help (root) {
    if (!root) {
      return 0
    }
    const left = help(root.left)
    const right = help(root.right)
    sum = Math.max(sum, left + right)
    return Math.max(right, left) + 1
  }
}