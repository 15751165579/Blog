/**
 * 这道题实际上就是考BST的遍历
 */
/* eslint-disable */
const rangeSumBST = (root, L, R) => {
  let result = 0
  inOrder(root, result)
  function inOrder (root) {
    if (!root) {
      return null
    }
    inOrder(root.left)
    if (L <= root.val && root.val <= R) {
      result += root.val
    }
    inOrder(root.right)
  }
  return result
}