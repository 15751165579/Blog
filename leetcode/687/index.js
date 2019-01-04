/* eslint-disable */
const longestUnivaluePath = root => {
  if (!root) {
    return 0
  }
  let ans = 0

  help(root)
  return ans

  function help (root) {
    if (!root) {
      return 0
    }
    const l = help(root.left)
    const r = help(root.right)

    let pl = 0
    let pr = 0

    if (root.left && root.val === root.left.val) {
      pl = l + 1
    }

    if (root.right && root.val === root.right.val) {
      pr = r + 1
    }
    ans = Math.max(ans, pl + pr)
    return Math.max(pr, pl)
  }
}