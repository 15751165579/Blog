/* eslint-disable */
const flatten = root => {
  let pre = null
  dfs(root)
  function dfs (root) {
    if (!root) {
      return 
    }
    dfs(root.right)
    dfs(root.left)
    root.right = pre
    root.left = null
    pre = root
  }
}