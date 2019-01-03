/* eslint-disable */
const levelOrderBottom = root => {
  if (!root) {
    return []
  }
  const queue = [root]

  const ans = []

  while (queue.length) {

    const temp = []
    const size = queue.length

    for (let i = 0; i < size; i++) {
      const item = queue.pop()

      if (item) {
        temp.push(item.val)

        if (item.left) {
          queue.unshift(item.left)
        }
  
        if (item.right) {
          queue.unshift(item.right)
        }
      }
    }

    ans.unshift(temp)
  }

  return ans
}