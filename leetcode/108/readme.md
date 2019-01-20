# JavaScript刷LeetCode -- 108. Convert Sorted Array to Binary Search Tree

#### 一、解题思路

  &emsp;&emsp;根据BST的特性，利用二分法递归构建。

#### 二、代码实现

```JavaScript
const sortedArrayToBST = function (nums) {
  const max = nums.length
  if (max === 0) {
    return null
  }
  const mid = Math.floor(max / 2)
  const root = new TreeNode(nums[mid])
  root.left = sortedArrayToBST(nums.slice(0, mid))
  root.right = sortedArrayToBST(nums.slice(mid + 1, max))
  return root
}
```