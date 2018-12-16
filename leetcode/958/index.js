/* eslint-disable */
const isCompleteTree = (root) => {
  if (!root) {
    return true
  }
  const ans = []
  order(root, 0)
  let result = []
  for (let i = 0; i < ans.length - 1; i++) {
    result = result.concat(ans[i])
  }

  let is = false
  for (let i = 0; i < result.length; i++) {
    const item = result[i]
    if (item == null && !is) {
      is = true
    } else if (item && is) {
      return false
    }
  }
  return true
  function order (root, level) {
    if (!root) {
      if (!ans[level]) {
        ans[level] = []
      }
      ans[level].push(null)
      return
    }
    if (!ans[level]) {
      ans[level] = []
    }
    ans[level].push(root.val)
    order(root.left, level + 1)
    order(root.right, level + 1)
  }
}