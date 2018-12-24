/* eslint-disable */
const rightSideView = root => {
  const ans = []
  help(root, 0)
  return ans
  function help (root, index) {
    if (!root) {
      return
    }
    if (ans[index] === undefined) {
      ans[index] = root.val
    }
    help(root.right, index + 1)
    help(root.left, index + 1)
  }
}