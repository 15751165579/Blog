# JavaScript刷LeetCode -- 965. Univalued Binary Tree

#### 一、题目

&emsp;&emsp;A binary tree is univalued if every node in the tree has the same value.

&emsp;&emsp;Return true if and only if the given tree is univalued.

#### 二、题目大意

  &emsp;&emsp;判断一颗二叉树中所有节点的值是不是相同。

#### 三、解题思路

  &emsp;&emsp;递归处理

#### 四、代码实现

```JavaScript
const isUnivalTree = root => {
  if (!root) {
    return true
  }

  let pre = null
  let ans = true
  help(root)
  return ans
  function help (root) {
    if (!root) {
      return
    }

    if (!pre) {
      pre = root.val
    } else if (pre && pre !== root.val) {
      ans = false
      return
    }

    help(root.left)
    help(root.right)
  }
}
```