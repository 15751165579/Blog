# JavaScript刷LeetCode -- 103. Binary Tree Zigzag Level Order Traversal [Medium]

#### 一、题目

  &emsp;&emsp;Given a binary tree, return the zigzag level order traversal of its nodes' values. (ie, from left to right, then right to left for the next level and alternate between).

#### 二、题目大意

  &emsp;&emsp;给定一个二叉树，返回其节点值的锯齿级遍历。（也就是说，从左到右，然后从右到左进入下一个等级，在两者之间交替）。

#### 三、解题思路

  &emsp;&emsp;利用队列遍历二叉树。

#### 四、代码实现

```JavaScript
const zigzagLevelOrder = root => {
  const ans = []
  if (!root) {
    return ans
  }

  const q = [root]

  let step = 0
  while (q.length) {
    const max = q.length

    for (let i = 0; i < max; i++) {
      const item = q.pop()
      if (item) {
        ans[step] = ans[step] || []
        if (step % 2 === 0) {
          ans[step].push(item.val)
        } else {
          ans[step].unshift(item.val)
        }

        item.left && q.unshift(item.left)
        item.right && q.unshift(item.right)
      }
    }
    step++
  }

  return ans
}
```