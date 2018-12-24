# JavaScript刷LeetCode -- 114. Flatten Binary Tree to Linked List [Medium]

#### 一、题目

&emsp;&emsp;Given a binary tree, flatten it to a linked list in-place.

&emsp;&emsp;For example, given the following tree:

```s
     1
    / \
   2   5
  / \   \
 3   4   6
```
&emsp;&emsp;The flattened tree should look like:

```s
 1
  \
   2
    \
     3
      \
       4
        \
         5
          \
           6
```

#### 二、题目大意

  &emsp;&emsp;如上述。

#### 三、解题思路

  &emsp;&emsp;本题实际上是不断的修改当前节点的右子树，利用递归遍历时，需要先从右节点开始，不断替换当前节点的右节点，并且保留当前节点作为下一次替换使用。

#### 四、代码实现

```JavaScript
const flatten = root => {
  let pre = null
  dfs(root)
  function dfs (root) {
    if (!root) {
      return 
    }
    dfs(root.right)
    dfs(root.left)
    root.right = pre
    root.left = null
    pre = root
  }
}
```