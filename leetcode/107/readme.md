# JavaScript刷LeetCode -- 107. Binary Tree Level Order Traversal II

#### 一、题目

  &emsp;&emsp;Given a binary tree, return the bottom-up level order traversal of its nodes' values. (ie, from left to right, level by level from leaf to root)。

#### 二、题目大意

  &emsp;&emsp;给定二叉树，返回其节点值的自下而上的顺序遍历。（即从左到右，从叶到根逐级排列）。

#### 三、解题思路

  &emsp;&emsp;此道题属于分层遍历二叉树，可以采用递归和队列的方式处理。

#### 四、代码实现

```JavaScript
// 队列
const levelOrderBottom = root => {
  const ans = []
  if (!root) {
    return ans
  }
  const queue = [root]
  while (queue.length) {
    const temp = []
    const max = queue.length
    for (let i = 0; i < max; i++) {
      const item = queue.pop()
      if (item) {
        temp.push(item.val)
        item.left && queue.unshift(item.left)
        item.right && queue.unshift(item.right)
      }
    }
    ans.unshift(temp)
  }
  return ans
}
```

```JavaScript
// 递归
const levelOrderBottom = root => {
  const ans = []
  if (!root) {
    return ans
  }

  levelOrder(root, 0)

  return ans.reverse()

  function levelOrder (root, level) {
    if (!root) {
      return
    }

    ans[level] || (ans[level] = [])

    ans[level].push(root.val)
    levelOrder(root.left, level + 1)
    levelOrder(root.right, level + 1)

  }
}
```