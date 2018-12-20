# JavaScript刷LeetCode -- 257. Binary Tree Paths

#### 一、题目

&emsp;&emsp;Given a binary tree, return all root-to-leaf paths.

&emsp;&emsp;Note: A leaf is a node with no children.

```s
  Example:

  Input:

    1
  /   \
 2     3
  \
   5

  Output: ["1->2->5", "1->3"]

  Explanation: All root-to-leaf paths are: 1->2->5, 1->3
```

#### 二、题目大意

  &emsp;&emsp;找出所有根节点到叶子节点的路径。

#### 三、解题思路

  &emsp;&emsp;递归遍历二叉树。

#### 四、代码实现

```JavaScript
const binaryTreePaths = root => {
  const ans = []

  if (!root) {
    return ans
  }

  help(root, String(root.val))

  return ans
  function help (root, str) {
    if (!root.left && !root.right) {
      ans.push(str)
      return
    }
    if (root.left) {
      help(root.left, str + '->' + root.left.val)
    }
    if (root.right) {
      help(root.right, str + '->' + root.right.val)
    }
  }
}
```