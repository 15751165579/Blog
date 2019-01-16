/* eslint-disable */
const maxPathSum = root => {
  let ans = Number.MIN_SAFE_INTEGER
  maxTreeSum(root)

  return ans
  function maxTreeSum (root) {
    if (!root) {
      return Number.MIN_SAFE_INTEGER
    }
    const rootValue = root.val
    const left = maxTreeSum(root.left)
    const right = maxTreeSum(root.right)
    const currentTreeSum = Math.max.call(this, rootValue, rootValue + left, rootValue + right)
    ans = Math.max.call(this, ans, currentTreeSum, left, right, rootValue + left + right)
    return currentTreeSum
  }
}