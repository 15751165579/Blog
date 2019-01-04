# JavaScript刷LeetCode -- 687. Longest Univalue Path

#### 一、题目

  &emsp;&emsp;Given a binary tree, find the length of the longest path where each node in the path has the same value. This path may or may not pass through the root.

#### 二、题目大意

  &emsp;&emsp;从二叉树中找出一条节点值相同的最长路径。

#### 三、解题思路

  &emsp;&emsp;这道题目实际转化为递归计算子树中相同节点的最长路径。

#### 四、代码实现

```JavaScript
const longestUnivaluePath = root => {
  if (!root) {
    return 0
  }
  let ans = 0

  help(root)
  return ans

  function help (root) {
    if (!root) {
      return 0
    }
    const l = help(root.left)
    const r = help(root.right)

    let pl = 0
    let pr = 0

    if (root.left && root.val === root.left.val) {
      pl = l + 1
    }

    if (root.right && root.val === root.right.val) {
      pr = r + 1
    }
    ans = Math.max(ans, pl + pr)
    return Math.max(pr, pl)
  }
}
```