# JavaScript刷LeetCode -- 894. All Possible Full Binary Trees [Medium]

#### 一、题目

  &emsp;&emsp;A full binary tree is a binary tree where each node has exactly 0 or 2 children.

  &emsp;&emsp;Return a list of all possible full binary trees with N nodes.  Each element of the answer is the root node of one possible tree.

  &emsp;&emsp;Each node of each tree in the answer must have node.val = 0.

  &emsp;&emsp;You may return the final list of trees in any order.

#### 二、题目大意

  &emsp;&emsp;生成具有N个节点的完全二叉树的所有结果，节点的值全部设置为0。

#### 三、解题思路

  &emsp;&emsp;递归生成左右子树，需要注意的是完全二叉树每个节点只有零个或者两个子节点，那么递归的生成一个子树的N数目应该只能为奇数。

#### 四、代码实现

```JavaScript
const allPossibleFBT = N => {
  const ans = []
  if (N % 2 === 0) {
    return ans
  }
  if (N === 1) {
    ans.push(new TreeNode(0))
    return ans
  }
  for (let i = 1; i < N; i += 2) {
    for (let ltree of allPossibleFBT(i)) {
      for (let rtree of allPossibleFBT(N - i - 1)) {
        const root = new TreeNode(0)
        root.left = ltree
        root.right = rtree
        ans.push(root)
      }
    }
  }
  return ans
}
```