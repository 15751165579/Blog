/* eslint-disable */
const constructMaximumBinaryTree = nums => {
  let max = nums.length
  if (max === 0) {
    return null
  }
  const root = new TreeNode()
  let maxValue = nums[0]
  let index = 0
  for (let i = 0; i < max; i++) {
    const item = nums[i]
    if (item > maxValue) {
      index = i
      maxValue = item
    }
  }
  root.val = maxValue
  root.left = constructMaximumBinaryTree(nums.slice(0, index))
  root.right = constructMaximumBinaryTree(nums.slice(index + 1, max))
  return root
}