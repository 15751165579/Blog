// 分层遍历 加上逐层寻找 超时
/* eslint-disable */
const widthOfBinaryTree = root => {
  let ans = 1
  let len = getHeight(root)

  const x = [root]
  while (--len) {
    
    const max = x.length
    for (let i = 0; i < max; i++) {
      const item = x.pop()
      if (!item) {
        x.unshift(null)
        x.unshift(null)
      } else {
        const { left, right }= item
        x.unshift(right)
        x.unshift(left)
      }
    }
    let start = 0
    let end = x.length - 1
    while (start <= end) {
      if (x[start] && x[end]) {
        ans = Math.max(ans, end - start + 1)
        break
      }
      if (!x[start]) {
        start++
      }
      if (!x[end]) {
        end--
      }
    }
  }
  return ans

  function getHeight (root) {
    if (!root) {
      return 0
    }
    return Math.max(getHeight(root.left), getHeight(root.right)) + 1
  }
}

const widthOfBinaryTree1 = root => {
  if (!root) {
    return 0
  }
  const MAX = Number.MAX_SAFE_INTEGER
  const q = [ [root, 1] ]
  let ans = 1
  while (q.length) {
    ans = Math.max(q[q.length - 1][1] - q[0][1] + 1, ans)
    const max = q.length
    for (let i = 0; i < max; i++) {
      const x = q.shift()
      const [item, index] = x
      if (item.left) {
        q.push([item.left, (2 * index) % MAX])
      }
      if (item.right) {
        q.push([item.right, (2 * index + 1) % MAX])
      }
    }
  }
  return ans
}

