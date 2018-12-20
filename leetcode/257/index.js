/* eslint-disable */
const binaryTreePaths = root => {
  const ans = []

  if (!root) {
    return []
  }

  help(root, String(root.val))

  return ans
  function help (root, str) {
    if (!root.left && !root.right) {
      ans.push(str)
      return
    }
    if (root.left) {
      help(root.left, str + '->' + root.left.val)
    }
    if (root.right) {
      help(root.right, str + '->' + root.right.val)
    }
  }
}