# JavaScript刷LeetCode -- 662. Maximum Width of Binary Tree【Medium】

#### 一、题目

&emsp;&emsp;Given a binary tree, write a function to get the maximum width of the given tree. The width of a tree is the maximum width among all levels. The binary tree has the same structure as a full binary tree, but some nodes are null.

&emsp;&emsp;The width of one level is defined as the length between the end-nodes (the leftmost and right most non-null nodes in the level, where the null nodes between the end-nodes are also counted into the length calculation.

#### 二、题目大意

  &emsp;&emsp;二叉树的宽度定义为端节点之间的长度，并且其中端节点之间的空节点也被计算在长度之内。

#### 三、解题思路

  &emsp;&emsp;这道题目采用分层遍历的方法获取每一层的最大宽度，最终得出树的最大宽度，但是在树中是存在空节点的，所以这里采用记录节点下标的方式，计算端节点下标的差值得到当前层级的宽度。

#### 四、代码实现

```JavaScript
const widthOfBinaryTree = root => {
  if (!root) {
    return 0
  }
  const MAX = Number.MAX_SAFE_INTEGER
  const q = [ [root, 1] ]
  let ans = 1
  while (q.length) {
    ans = Math.max(q[q.length - 1][1] - q[0][1] + 1, ans)
    const max = q.length
    for (let i = 0; i < max; i++) {
      const x = q.shift()
      const [item, index] = x
      if (item.left) {
        // 这里需要考虑下标可能会超出最大值
        q.push([item.left, (2 * index) % MAX])
      }
      if (item.right) {
        q.push([item.right, (2 * index + 1) % MAX])
      }
    }
  }
  return ans
}
```