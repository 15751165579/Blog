# JavaScript刷LeetCode -- 199. Binary Tree Right Side View [Medium]

#### 一、题目

&emsp;&emmsp;Given a binary tree, imagine yourself standing on the right side of it, return the values of the nodes you can see ordered from top to bottom.

```n
  Example:

  Input: [1,2,3,null,5,null,4]
  Output: [1, 3, 4]
  Explanation:

    1            <---
  /   \
 2     3         <---
  \     \
   5     4       <---
```

#### 二、题目大意 

  &emsp;&emsp;给定一个二叉树，想象自己站在它的右侧，返回从上到下排序的节点的值。

#### 三、解题思路

  &emsp;&emsp;这道题实际上就是分层遍历二叉树。

#### 四、代码实现

```JavaScript
const rightSideView = root => {
  const ans = []
  help(root, 0)
  return ans
  function help (root, index) {
    if (!root) {
      return
    }
    if (ans[index] === undefined) {
      ans[index] = root.val
    }
    help(root.right, index + 1)
    help(root.left, index + 1)
  }
}
```