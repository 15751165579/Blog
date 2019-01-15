/* eslint-disable */
const pathSum = (root, sum) => {
  const ans = []
  help(root, sum, '')
  return ans
  function help (root, sum, path) {
    if (!root) {
      return
    }
    const rv = root.val

    // 计算当前节点的和值
    sum -= rv
    // 拼接路径
    if (path) {
      path += `,${rv}`
    } else {
      path += rv
    }
    // 当前节点和值为零，并且是叶子节点
    if (sum === 0 && !root.left && !root.right) {
      ans.push(path.split(','))
      return
    }

    help(root.left, sum, path)
    help(root.right, sum, path)
  }
}