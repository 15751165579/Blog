/* eslint-disable */
const findFrequentTreeSum = root => {

  const m = {}

  help(root)

  const max = Math.max.apply(this, Object.values(m))

  const ans = []
  for (let item in m) {
    if (m[item] === max) {
      ans.push(item)
    }
  }

  return ans

  function help (root) {
    if (!root) {
      return 0
    }

    const currentSum = root.val + help(root.left) + help(root.right)

    if (!m[currentSum]) {
      m[currentSum] = 0
    }
    m[currentSum]++

    return currentSum
  }
}