/* eslint-disable */
const countNodes = root => {
  const ans = []
  dfs(root)
  return ans.length
  function dfs (root) {
    if (!root) {
      return
    }
    ans.push(root.val)
    dfs(root.left)
    dfs(root.right)
  }
}