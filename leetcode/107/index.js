/* eslint-disable */
const levelOrderBottom = root => {
  const ans = []
  if (!root) {
    return ans
  }
  const queue = [root]
  while (queue.length) {
    const temp = []
    const max = queue.length
    for (let i = 0; i < max; i++) {
      const item = queue.pop()
      if (item) {
        temp.push(item.val)
        item.left && queue.unshift(item.left)
        item.right && queue.unshift(item.right)
      }
    }
    ans.unshift(temp)
  }
  return ans
}

const levelOrderBottom1 = root => {
  const ans = []
  if (!root) {
    return ans
  }

  levelOrder(root, 0)

  return ans.reverse()

  function levelOrder (root, level) {
    if (!root) {
      return
    }

    ans[level] || (ans[level] = [])

    ans[level].push(root.val)
    levelOrder(root.left, level + 1)
    levelOrder(root.right, level + 1)

  }
}