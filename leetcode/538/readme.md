# JavaScript刷LeetCode -- 538. Convert BST to Greater Tree

#### 一、题目

&emsp;&emsp;Given a Binary Search Tree (BST), convert it to a Greater Tree such that every key of the original BST is changed to the original key plus sum of all keys greater than the original key in BST.

```JavaScript
Example:

Input: The root of a Binary Search Tree like this:
              5
            /   \
           2     13

Output: The root of a Greater Tree like this:
             18
            /   \
          20     13
```

#### 二、题目大意

&emsp;&emsp;将给定的二叉树上的每个节点的值更新为二叉树上所有大于等于该值的节点之和。

#### 三、解题思路

&emsp;&emsp;对于BST进行中序遍历，可以得到一个有序队列，所有对于这道题目，可以逆中序遍历的方式，从最大值的节点向前累加。

#### 四、代码实现

```JavaScript
const convertBST = root => {
  let sum = 0
  dfs(root)
  return root
  function dfs (root) {
    if (!root) {
      return
    }
    dfs(root.right)
    root.val += sum
    sum = root.val
    dfs(root.left)
  }
}
```