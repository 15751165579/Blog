# JavaScript刷LeetCode -- 513. Find Bottom Left Tree Value [Medium]

#### 一、题目

  &emsp;&emsp;Given a binary tree, find the leftmost value in the last row of the tree.

#### 二、题目大意

  &emsp;&emsp;给出二叉树最后一行中最左边的节点值。

#### 三、解题思路

  &emsp;&emsp;采用队列分层遍历二叉树。

#### 四、代码实现

```JavaScript
const findBottomLeftValue = (root) => {
  if (!root) {
    return null
  }

  const q = [root]
  let ans = root.val

  while (q.length) {

    const max = q.length

    for (let i = 0; i < max; i++) {
      const item = q.pop()
      if (item && item.left) {
        q.unshift(item.left)
      }
      if (item && item.right) {
        q.unshift(item.right)
      }
    }

    // 拿出最左边的节点值
    const l = q.length
    if (l > 0) {
      ans = q[l - 1].val
    }
  }

  return ans
}
```