# JavaScript刷LeetCode -- 652. Find Duplicate Subtrees [Medium]

#### 一、题目

  &emsp;&emsp;Given a binary tree, return all duplicate subtrees. For each kind of duplicate subtrees, you only need to return the root node of any one of them.

  &emsp;&emsp;Two trees are duplicate if they have the same structure with same node values.

#### 二、题目大意

  &emsp;&emsp;找出二叉树中相同的子树。

#### 三、解题思路

  &emsp;&emsp;递归记录遍历子树，以子树的节点路径为key记录相同子树出现的次数。

#### 四、代码实现

```JavaScript
const findDuplicateSubtrees = root => {

  const ans = []
  if (!root) {
    return ans
  }

  // 记录所有的路径
  const m = {}
  help(root)

  return ans

  function help (root) {
    if (!root) {
      return
    }

    const path = `${root.val},${help(root.left)},${help(root.right)}`

    m[path] = m[path] || 0
    if (m[path]++ === 1) {
      ans.push(root)
    }
    return path
  }
}
```