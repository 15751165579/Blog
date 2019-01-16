/* eslint-disable */
const minCameraCover = root => {
  let ans = 0
  // 1 当前节点被覆盖 2 表示当前节点装上了摄像头 0 表示当前节点未被覆盖
  if (help(root) === 0) {
    // 二叉树仅有一个根节点组成的情况
    ans++
  }
  return ans
  function help (root) {
    if (!root) {
      return 1
    }
    const l = help(root.left)
    const r = help(root.right)

    if (l === 0 || r === 0) {
      ans++
      return 2
    }
    if (l === 2 || r === 2) {
      return 1
    }
    return 0
  }
}