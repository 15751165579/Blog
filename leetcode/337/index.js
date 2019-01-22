/* eslint-disable */
// 很多重复的操作
const rob = root => {
  if (!root) {
    return 0
  }

  const rv = root.val

  const ll = root.left ? rob(root.left.left) : 0
  const lr = root.left ? rob(root.left.right) : 0
  const rl = root.right ? rob(root.right.left) : 0
  const rr = root.right ? rob(root.right.right) : 0

  return Math.max(rv + ll + lr + rl + rr, rob(root.left) + rob(root.right))
}

// 记忆化解决子问题重复

// 状态的严格区分 本质上避免子问题

const rob1 = root => {
  const ans = robSub(root)
  return Math.max(ans[0], ans[1])

  function robSub (root) {
    if (!root) {
      return [0, 0]
    }
    const left = robSub(root.left)
    const right = robSub(root.right)

    const res = []

    // 根节点不抢
    res[0] = Math.max(left[0], left[1]) + Math.max(right[0], right[1])
    // 根节点抢
    res[1] = root.val + left[0] + right[0]

    return res
  }
}