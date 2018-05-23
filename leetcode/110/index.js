/**
 * Balanced Binary Tree
 */
const isBalanced = function (root) {
  if (!root) {
    return true
  }
  let lh = height(root.left)
  let rh = height(root.right)
  return Math.abs(lh - rh) <= 1 && isBalanced(root.left) && isBalanced(root.right)
  function height (root) {
    if (!root) {
      return 0
    }
    return Math.max(height(root.left), height(root.right)) + 1
  }
}

const isBalanced1 = function (root) {
  if (!root) {
    return true
  }
  let isValid = true
  height(root)
  return isValid
  function height (root) {
    if (!root) {
      return 0
    }
    const lh = height(root.left)
    const rh = height(root.right)

    if (Math.abs(lh - rh) > 1) {
      isValid = false
       return -1
    }
    return Math.max(lh, rh) + 1
  }
}