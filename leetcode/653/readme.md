# JavaScript刷LeetCode -- 653. Two Sum IV - Input is a BST

#### 一、题目

  &emsp;&emsp;Given a Binary Search Tree and a target number, return true if there exist two elements in the BST such that their sum is equal to the given target.

#### 二、题目大意

  &emsp;&emsp;二叉搜索树中是否存在两个元素的值为k。

#### 三、解题思路

  &emsp;&emsp;递归遍历二叉树。

#### 四、代码实现

```JavaScript
const findTarget = (root, k) => {
  const ans = []

  help(root)

  const max = ans.length
  for (let i = 0; i < max; i++) {
    for (let j = i + 1; j < max; j++) {
      const pre = ans[i]
      const next = ans[j]
      if (pre + next === k) {
        return true
      }
    }
  }

  return false

  function help (root) {
    if (!root) {
      return
    }
    help(root.left)
    ans.push(root.val)
    help(root.right)
  }
}
```