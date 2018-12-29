/* eslint-disable */
const postorderTraversal = root => {
  const ans = []
  help(root)
  return ans
  function help (root) {
    if (!root) {
      return
    }
    help(root.left)
    help(root.right)
    ans.push(root.val)
  }
}