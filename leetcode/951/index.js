/* eslint-disable */
const flipEquiv = (root1, root2) => {
  if (!root1 && !root2) {
    return true
  }

  if (!root1 || !root2) {
    return false
  }
  if (root1.val === root2.val) {
    return (flipEquiv(root1.left, root2.left) && flipEquiv(root1.right, root2.right)) || (flipEquiv(root1.left, root2.right) && flipEquiv(root1.right, root2.left))
  } else {
    return false
  }
}