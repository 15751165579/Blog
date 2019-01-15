/* eslint-disable */

const deleteNode = (root, key) => {
  if (!root) {
    return root
  }
  if (root.val > key) {
    root.left = deleteNode(root.left, key)
  } else if (root.val < key) {
    root.right = deleteNode(root.right, key)
  } else {
    if (root.left && root.right) {
      // 左右节点都存在的情况下，从右子树中找到一个最小值作为新的根节点
      let min = root.right
      while (min.left) {
        min = min.left
      }
      root.val = min.val
      root.right = deleteNode(root.right, min.val)
    } else {
      // 当前节点只有左子树或者右子树时，直接返回子树即可。
      return (root.left ? root.left : root.right)
    }
  }
  return root
}