/* eslint-disable */
const recoverTree = root => {
  let x = null
  let y = null
  let pre = null

  traverse(root)

  let temp = x.val
  x.val = y.val
  y.val = temp

  return root

  function traverse (root) {
    if (!root) {
      return
    }
    traverse(root.left)
    if (pre) {
      if (!x && pre.val >= root.val) {
        x = pre
      }
      if (x && pre.val >= root.val) {
        y = root
      }
    }
    pre = root
    traverse(root.right)
  }
}