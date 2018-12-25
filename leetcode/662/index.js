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

