/* eslint-disable */
const isValidBST = root => {
  const ans = []
  help(root)
  for (let i = 0, max = ans.length; i < max - 1; i++) {
    const pre = ans[i]
    const next = ans[i + 1]
    if (next <= pre) {
      return false
    }
  }
  return true
  function help (root) {
    if (!root) {
      return
    }
    help(root.left)
    ans.push(root.val)
    help(root.right)
  }
}