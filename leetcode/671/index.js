/* eslint-disable */
const findSecondMinimumValue = root => {

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