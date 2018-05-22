/**
 * Binary Tree Level Order Travarsal Medium
 */

const levelOrder = function (root) {
  const result = []
  _levelOrder(root, result, 0)
  return result
  function _levelOrder (root, result, dep) {
    if (!root) {
      return
    }

    let curLevel = []
    if (result[dep]) {
      curLevel = result[dep]
    } else {
      result[dep] = curLevel
    }

    curLevel.push(root.val)

    _levelOrder(root.left, result, ++dep)
    _levelOrder(root.right, result, dep)
  }
}