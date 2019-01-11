# JavaScript刷LeetCode -- 623. Add One Row to Tree [Medium]

#### 一、题目

  &emsp;&emsp;Given the root of a binary tree, then value v and depth d, you need to add a row of nodes with value v at the given depth d. The root node is at depth 1.

  &emsp;&emsp;The adding rule is: given a positive integer depth d, for each NOT null tree nodes N in depth d-1, create two tree nodes with value v as N's left subtree root and right subtree root. And N's original left subtree should be the left subtree of the new left subtree root, its original right subtree should be the right subtree of the new right subtree root. If depth d is 1 that means there is no depth d-1 at all, then create a tree node with value v as the new root of the whole original tree, and the original tree is the new root's left subtree.

#### 二、题目大意

  &emsp;&emsp;给定深度d添加一行值v的节点，根节点的深度为1。添加规则：给定一个正整数深度d，对于深度d-1中的每个非空树节点n，创建两个值为v的树节点作为n的左子树根和右子树根。而n原来的左子树应该是新的左子树根的左子树，它原来的右子树应该是新的右子树根的右子树。如果深度d为1，意味着根本没有深度d-1，那么创建一个值为v的树节点作为整个原始树的新根，原始树是新根的左子树。

#### 三、解题思路

  &emsp;&emsp;理解规则之后，对于d=1处理的比较简单，对于d>1时，需要找出d-1层所有的节点进行处理即可，相对比较简单。

#### 四、代码实现

```JavaScript
const addOneRow = (root, v, d) => {
  if (!root) {
    return null
  }
  const q = [root]
  let deep = 1
  if (d === 1) {
    const r = new TreeNode(v)
    r.left = root
    return r
  }
  while(deep < d - 1) {
    const max = q.length

    for (let i = 0; i < max; i++) {
      const item = q.pop()

      if (item) {
        item.left && q.unshift(item.left)
        item.right && q.unshift(item.right)
      }
    }
    deep++
  }

  // 插入节点
  for (let i = 0; i < q.length; i++) {
    const item = q[i]
    const x = item.left
    item.left = new TreeNode(v)
    item.left.left = x

    const y = item.right
    item.right = new TreeNode(v)
    item.right.right = y
  }
  return root
}
```