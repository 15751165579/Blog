# JavaScript刷LeetCode -- 102. Binary Tree Level Order Traversal [Medium]

#### 一、题目

  &emsp;&emsp;Given a binary tree, return the level order traversal of its nodes' values. (ie, from left to right, level by level).

#### 二、题目大意

  &emsp;&emsp;层级遍历二叉树。

#### 三、解题思路

  &emsp;&emsp;这里采用队列的方式解决，同样也可以采用递归的方式。

#### 代码实现

```JavaScript
const levelOrder = root => {
  const ans = []
  if (!root) {
    return ans
  }

  const q = [root]
  let deep = 0

  while (q.length) {
    const max = q.length

    for (let i = 0; i < max; i++) {
      const item = q.pop()
      if (item) {
        if (!ans[deep]) {
          ans[deep] = []
        }
        ans[deep].push(item.val)
        item.left && q.unshift(item.left)
        item.right && q.unshift(item.right)
      }
    }
    deep++
  }

  return ans
}
```