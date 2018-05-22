/**
 * Binary Tree Level Order Traversal
 */

function TreeNode (val) {
  this.val = val
  this.right = this.left = null
}
const levelOrderBottom = function (root) {
  const result = []
  if (root === null) {
    return result
  }
  const q = []
  q.push(root)
  result.push([root.val])
  while (q.length > 0) {
    const len = q.length
    const temp = []
    for (let i = 0; i < len; i++) {
      const item = q.shift()
      const left = item.left
      const right = item.right
      if (left !== null) {
        temp.push(left.val)
        q.push(left)
      }
      if (right !== null) {
        temp.push(right.val)
        q.push(right)
      }
    }
    if (temp.length > 0) {
      result.unshift(temp)
    }
  }
  return result
}

const levelOrderBottom1 = function (root) {
  const result = []
  _levelOrderBottom(root, result, 0)
  return result.reverse()
  function _levelOrderBottom (root, result, dep) {
    if (!root) {
      return
    }
    let temp = null
    if (result[dep]) {
      temp = result[dep]
    } else {
      temp = []
      result[dep] = temp
    }

    temp.push(root.val)

    _levelOrderBottom(root.left, result, ++dep)
    _levelOrderBottom(root.right, result, dep)
  }
}