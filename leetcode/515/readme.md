# JavaScript刷LeetCode -- 515. Find Largest Value in Each Tree Row [Medium]

#### 一、题目

  &emsp;&emsp;You need to find the largest value in each row of a binary tree.

#### 二、题目大意

  &emsp;&emsp;找出二叉树每层节点的最大值。

#### 三、解题思路

  &emsp;&emsp;采用队列分层遍历二叉树。

#### 四、代码实现

```JavaScript
const largestValues = root => {
  const ans = []
  if (!root) {
    return ans
  }

  const q = [root]
  while (q.length) {
    const len = q.length
    let max = Number.MIN_SAFE_INTEGER

    for (let i = 0; i < len; i++) {
      const item = q.pop()
      if (item) {
        max = Math.max(item.val, max)

        item.left && q.unshift(item.left)

        item.right && q.unshift(item.right)
      }
    }

    ans.push(max)
  }
  return ans
}
```