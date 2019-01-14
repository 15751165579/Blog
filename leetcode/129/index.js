/* eslint-disable */
const sumNumbers = (root) => {
  return help(root, 0)
  function help (root, sum) {
    if (!root) {
      return 0
    }
    if (!root.left && !root.right) {
      return root.val + sum * 10
    }
    sum = root.val + sum * 10

    return help(root.left, sum) + help(root.right, sum)
  }
}