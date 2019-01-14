/* eslint-disable */
const flipMatchVoyage = (root, voyage) => {
  let ans = []
  // 记录访问到第几个节点
  let position = {
    index: 0
  }

  help(root, voyage, position)

  return ans

  function help (root, voyage) {
    if (!root) {
      return
    }
    if (root.val !== voyage[position.index]) {
      ans = [-1]
      return
    }

    if (root.left && root.left.val !== voyage[position.index + 1]) {
      // 交换左右子树
      const temp = root.left
      root.left = root.right
      root.right = temp
      ans.push(root.val)
    }
    position.index++
    help(root.left, voyage)
    help(root.right, voyage)
  }
}