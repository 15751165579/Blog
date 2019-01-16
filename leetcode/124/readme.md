# JavaScript刷LeetCode -- 124. Binary Tree Maximum Path Sum [Hard]

#### 一、题目

  &emsp;&emsp;Given a non-empty binary tree, find the maximum path sum.

  &emsp;&emsp;For this problem, a path is defined as any sequence of nodes from some starting node to any node in the tree along the parent-child connections. The path must contain at least one node and does not need to go through the root.

#### 二、题目大意

  &emsp;&emsp;给定一个非空的二叉树，找到最大路径和。对于这个问题，路径被定义为沿着父子连接从某个起始节点到树中任意节点的任意节点序列。路径必须至少包含一个节点，并且不需要通过根目录。

#### 三、解题思路

  &emsp;&emsp;一个二叉树中存在的路径有以下几种情况：

```s
    1
   / \
  2   3

  对于上述二叉树的路径有：

  1, 2, 3, 1->2, 1->3, 2->1->3
```

  &emsp;&emsp;那么在递归二叉树的过程中，记录每个子树的最大路径即可。

#### 四、代码实现

```JavaScript
const maxPathSum = root => {

  let ans = Number.MIN_SAFE_INTEGER
  maxTreeSum(root)

  return ans
  function maxTreeSum (root) {
    if (!root) {
      return Number.MIN_SAFE_INTEGER
    }
    const rootValue = root.val
    const left = maxTreeSum(root.left)
    const right = maxTreeSum(root.right)
    const currentTreeSum = Math.max.call(this, rootValue, rootValue + left, rootValue + right)
    ans = Math.max.call(this, ans, currentTreeSum, left, right, rootValue + left + right)
    return currentTreeSum
  }
}
```