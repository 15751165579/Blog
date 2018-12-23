/* eslint-disable */
const inorderTraversal = root => {
  const ans = []
  help(root)
  return ans
  function help (root) {
    if (!root) {
      return
    }
    help(root.left)
    ans.push(root.val)
    help(root.right)
  }
}