# JavaScript刷LeetCode -- 654. Maximum Binary Tree【Medium】

#### 一、题目

&emsp;&emsp;Given an integer array with no duplicates. A maximum tree building on this array is defined as follow:

 - The root is the maximum number in the array.
 - The left subtree is the maximum tree constructed from left part subarray divided by the maximum number.
 - The right subtree is the maximum tree constructed from right part subarray divided by the maximum number.

&emsp;&emsp;Construct the maximum tree by the given array and output the root node of this tree.

#### 二、题目大意

  通过给定的数组构建一个最大的二叉树，这个最大的二叉树必须满足根节点的值大于左右子节点的值。

#### 三、解题思路 

  递归求解

#### 四、代码实现

```JavaScript
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
```