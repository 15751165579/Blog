/* eslint-disable */

const kthSmallest1 = (root, k) => {
  const ans = []

  help(root)

  return ans[k - 1]

  function help (root) {
    if (!root) {
      return 
    }
    help(root.left)
    ans.push(root.val)
    help(root.right)
  }
}