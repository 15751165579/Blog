# JavaScript刷LeetCode -- 222. Count Complete Tree Nodes

#### 一、题目

  &emsp;&emsp;Given a complete binary tree, count the number of nodes.

#### 二、题目大意

  &emsp;&emsp;计算完全二叉树节点的个数。

#### 三、解题思路

  &emsp;&emsp;递归遍历

#### 四、代码实现

```JavaScript
const countNodes = root => {
  const ans = []
  dfs(root)
  return ans.length
  function dfs (root) {
    if (!root) {
      return
    }
    ans.push(root.val)
    dfs(root.left)
    dfs(root.right)
  }
}
```