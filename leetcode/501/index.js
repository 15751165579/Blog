/* eslint-disable */
const findMode = root => {
  const m = {}
  let max = -1
  help(root)
  const ans = []
  for (let key in m) {
    if (m[key] === max) {
      ans.push(key)
    }
  }
  return ans
  function help (root) {
    if (!root) {
      return 
    }
    const val = root.val
    if (!m[val]) {
      m[val] = 0
    }
    m[val]++

    max = Math.max(max, m[val])

    help(root.left)
    help(root.right)
  }
}