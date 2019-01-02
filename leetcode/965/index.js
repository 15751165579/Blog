/* eslint-disable */
const isUnivalTree = root => {
  if (!root) {
    return true
  }

  let pre = null
  let ans = true
  help(root)
  return ans
  function help (root) {
    if (!root) {
      return
    }

    if (!pre) {
      pre = root.val
    } else if (pre && pre !== root.val) {
      ans = false
      return
    }

    help(root.left)
    help(root.right)
  }
}
