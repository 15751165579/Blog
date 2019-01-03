# JavaScript刷LeetCode -- 637. Average of Levels in Binary Tree

#### 一、题目

  &emsp;&emsp;Given a non-empty binary tree, return the average value of the nodes on each level in the form of an array.

#### 二、题目大意

  &emsp;&emsp;计算二叉树每一层节点的平均值。

#### 三、解题思路

  &emsp;&emsp;递归分层遍历二叉树。

#### 四、代码实现

```JavaScript
const averageOfLevels = root => {
  const ans = []
  help(root, 0)
  for (let i = 0; i < ans.length; i++) {
    const item = ans[i]
    const max = item.length
    ans[i] = item.reduce((pre, next) => pre + next, 0) / max
  }
  return ans
  function help (root, level) {
    if (!root) {
      return
    }
    if (!ans[level]) {
      ans[level] = []
    }
    ans[level].push(root.val)
    help(root.left, level + 1)
    help(root.right, level + 1)
  }
}
```