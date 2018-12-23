/* eslint-disable */
const printTree = root => {

  const height = getTreeHeight(root)
  const width = (1 << height) - 1

  // 初始化整个数组
  const ans = []
  for (let i = 0; i < height; i++) {
    ans[i] = []
    for (let j = 0; j < width; j++) {
      ans[i].push("")
    }
  }

  // 二分填充
  print(root, ans, 0, 0, width - 1)
  return ans
  function getTreeHeight (root) {
    if (!root) {
      return 0
    }
    return Math.max(getTreeHeight(root.left), getTreeHeight(root.right)) + 1
  }

  function print (root, ans, height, start, end) {
    if (!root) {
      return
    }
    const mid = (start + end) / 2
    ans[height][mid] = String(root.val)
    print(root.left, ans, height + 1, start, mid - 1)
    print(root.right, ans, height + 1, mid + 1, end)
  }

}