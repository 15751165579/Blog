# JavaScript刷LeetCode -- 437. Path Sum III

#### 一、题目

  &emsp;&emsp;You are given a binary tree in which each node contains an integer value.

  &emsp;&emsp;Find the number of paths that sum to a given value.

  &emsp;&emsp;The path does not need to start or end at the root or a leaf, but it must go downwards (traveling only from parent nodes to child nodes).

#### 二、题目大意

  &emsp;&emsp;从二叉树中找出和值为sum并且向下的路径个数。

#### 三、解题思路

  &emsp;&emsp;这道题可以采用递归的方式处理，也就是将题目转化为以二叉树中各种节点为根节点，找出以这个根节点开始向下并且和值为sum的路径总和。

#### 四、代码实现

```JavaScript
const pathSum = (root, sum) => {
  if (!root) {
    return 0
  }

  return countPath(root, sum) + pathSum(root.left, sum) + pathSum(root.right, sum)

  function countPath (root, sum) {
    let ans = 0
    if (!root) {
      return ans
    }

    if (root.val === sum) {
      ans++
    }

    ans += countPath(root.left, sum - root.val)
    ans += countPath(root.right, sum - root.val)

    return ans
  }
}
```