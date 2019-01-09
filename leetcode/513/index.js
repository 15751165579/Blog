/* eslint-disable */
const findBottomLeftValue = (root) => {
  if (!root) {
    return null
  }

  const q = [root]
  let ans = root.val

  while (q.length) {

    const max = q.length

    for (let i = 0; i < max; i++) {
      const item = q.pop()
      if (item && item.left) {
        q.unshift(item.left)
      }
      if (item && item.right) {
        q.unshift(item.right)
      }
    }

    // 拿出最左边的节点值
    const l = q.length
    if (l > 0) {
      ans = q[l - 1].val
    }
  }

  return ans
}