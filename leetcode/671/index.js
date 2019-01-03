/* eslint-disable */
const findSecondMinimumValue1 = root => {

  const ans = []
  help(root)

  ans.sort((next, pre) => next - pre)

  const max = ans.length

  if (max <= 1) {
    return -1
  }

  let x = ans[0]

  for (let i = 1; i < max; i++) {
    const temp = ans[i]
    if (temp !== x) {
      return temp
    }
  }

  return -1

  function help (root) {
    if (!root) {
      return
    }
    ans.push(root.val)
    help(root.left)
    help(root.right)
  }

}

const findSecondMinimumValue = root => {

  if (!root) {
    return -1
  }

  if (!root.left && !root.right) {
    return -1
  }

  let left = root.left.val
  let right = root.right.val

  if (root.left.val === root.val) {
    left = findSecondMinimumValue(root.left)
  }
  if (root.right.val === root.val) {
    right = findSecondMinimumValue(root.right)
  }

  if (left !== -1 && right !== -1) {
    return Math.min(left, right)
  } else if (left != -1) {
    return left
  } else {
    return right
  }
}