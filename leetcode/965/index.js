/* eslint-disable */
const isUnivalTree = root => {
  let ans = true
  if (!root) {
    return ans
  }

  let pre = null
  preOrder(root)
  return ans
  function preOrder (root) {
    if (!root) {
      return
    }

    if (!pre) {
      pre = root.val
    } else if (pre && pre !== root.val) {
      ans = false
      return
    }

    preOrder(root.left)
    preOrder(root.right)
  }
}

const isUnivalTree1 = root => {
  if (!root) {
    return true
  }

  const queue = [root]
  const val = root.val

  while (queue.length) {
    const max = queue.length

    for (let i = 0; i < max; i++) {
      const item = queue.pop()

      if (item) {
        if (!checkSame(item, val)) {
          return false
        }
        if (item.left && !checkSame(item.left, val)) {
          return false
        }
        if (item.right && !checkSame(item.right, val)) {
          return false
        }

        item.left && queue.unshift(item.left)
        item.right && queue.unshift(item.right)
      }
    }
  }
  return true

  function checkSame (root, val) {
    return root.val === val
  }
}
