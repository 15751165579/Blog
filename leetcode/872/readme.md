# JavaScript刷LeetCode -- 872. Leaf-Similar Trees

#### 一、题目

  Consider all the leaves of a binary tree.  From left to right order, the values of those leaves form a leaf value sequence.

  ![](https://s3-lc-upload.s3.amazonaws.com/uploads/2018/07/16/tree.png)

  For example, in the given tree above, the leaf value sequence is (6, 7, 4, 9, 8).

  Two binary trees are considered leaf-similar if their leaf value sequence is the same.

  Return true if and only if the two given trees with head nodes root1 and root2 are leaf-similar.

#### 二、题目大意

  如果两颗二叉树的叶子节点从左往右的顺序一致，返回true。

#### 三、解题思路

  递归遍历二叉树，获取到两颗二叉树的叶子节点数组，比较是否相同即可。

#### 四、代码实现

```JavaScript
const leafSimilar = (root1, root2) => {

  const x = help(root1, [])
  const y = help(root2, [])

  if (x.length !== y.length) {
    return false
  }

  for (let i = 0; i < x.length; i++) {
    const item1 = x[i]
    const item2 = y[i]
    if (item1 !== item2) {
      return false
    }
  }

  return true

  // 递归遍历
  function help (root, leaves) {
    if (!root) {
      return
    }
    if (!root.left && !root.right) {
      leaves.push(root.val)
    } else {
      help(root.left, leaves)
      help(root.right, leaves)
    }
    return leaves
  }
}
```