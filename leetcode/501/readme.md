# JavaScript刷LeetCode -- 501. Find Mode in Binary Search Tree

#### 一、题目

  &emsp;&emsp;Given a binary search tree (BST) with duplicates, find all the mode(s) (the most frequently occurred element) in the given BST.

  &emsp;&emsp;Assume a BST is defined as follows:

  - The left subtree of a node contains only nodes with keys less than or equal to the node's key.
  - The right subtree of a node contains only nodes with keys greater than or equal to the node's key.
  - Both the left and right subtrees must also be binary search trees.

#### 二、题目大意

  &emsp;&emsp;找出二叉搜索树中出现次数最多的节点值。

#### 三、解题思路

  &emsp;&emsp;递归统计二叉搜索树中节点值出现的次数。

#### 四、代码实现

```JavaScript
const findMode = root => {
  const m = {}
  let max = -1
  help(root)
  const ans = []
  for (let key in m) {
    if (m[key] === max) {
      ans.push(key)
    }
  }
  return ans
  function help (root) {
    if (!root) {
      return 
    }
    const val = root.val
    if (!m[val]) {
      m[val] = 0
    }
    m[val]++

    max = Math.max(max, m[val])

    help(root.left)
    help(root.right)
  }
}
```