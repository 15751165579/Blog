/* eslint-disable */
const findTilt = root => {
  function helper (root) {
    if (!root) {
      return 0
    }
    const left = helper(root.left)
    const right = helper(root.right)

    sum += Math.abs(left - right)
    return root.val + left + right
  }
  let sum = 0
  helper(root)
  return sum
}