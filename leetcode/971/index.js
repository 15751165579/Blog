/* eslint-disable */
const flipMatchVoyage = (root, voyage) => {
  let ans = []
  // 记录访问到第几个节点
  let position = 0

  help(root, voyage, position)

  return ans

  function help (root, voyage) {
    if (!root) {
      return
    }
    if (root.val !== voyage[position++]) {
      ans = [-1]
      return
    }

    if (root.left && root.left.val !== voyage[position]) {
      // 交换左右子树
      ans.push(root.val)
      help(root.right, voyage)
      help(root.left, voyage)
    } else {
      help(root.left, voyage)
      help(root.right, voyage)
    }
  }
}