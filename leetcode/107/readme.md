# JavaScript刷LeetCode -- 107. Binary Tree Level Order Traversal II

#### 一、题目

  &emsp;&emsp;Given a binary tree, return the bottom-up level order traversal of its nodes' values. (ie, from left to right, level by level from leaf to root)。

#### 二、题目大意

  &emsp;&emsp;给定二叉树，返回其节点值的自下而上的顺序遍历。（即从左到右，从叶到根逐级排列）。

#### 三、解题思路

  &emsp;&emsp;使用队列的思想。

#### 四、代码实现

```JavaScript
const levelOrderBottom = root => {
  if (!root) {
    return []
  }
  const queue = [root]

  const ans = []

  while (queue.length) {

    const temp = []
    const size = queue.length

    for (let i = 0; i < size; i++) {
      const item = queue.pop()

      if (item) {
        temp.push(item.val)

        if (item.left) {
          queue.unshift(item.left)
        }
  
        if (item.right) {
          queue.unshift(item.right)
        }
      }
    }

    ans.unshift(temp)
  }

  return ans
}
```