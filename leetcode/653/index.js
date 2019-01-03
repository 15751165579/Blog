
/* eslint-disable */
const findTarget = (root, k) => {
  const ans = []

  help(root)

  const max = ans.length
  for (let i = 0; i < max; i++) {
    for (let j = i + 1; j < max; j++) {
      const pre = ans[i]
      const next = ans[j]
      if (pre + next === k) {
        return true
      }
    }
  }

  return false

  function help (root) {
    if (!root) {
      return
    }
    help(root.left)
    ans.push(root.val)
    help(root.right)
  }
}