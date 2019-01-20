# JavaScript刷LeetCode -- 563. Binary Tree Tilt

#### 一、题目

&emsp;&emsp;Given a binary tree, return the tilt of the whole tree.

&emsp;&emsp;The tilt of a tree node is defined as the absolute difference between the sum of all left subtree node values and the sum of all right subtree node values. Null node has tilt 0.

&emsp;&emsp;The tilt of the whole tree is defined as the sum of all nodes' tilt.

Example:
```s
  Input: 
          1
        /   \
       2     3
  Output: 1
  Explanation: 
  Tilt of node 2 : 0
  Tilt of node 3 : 0
  Tilt of node 1 : |2-3| = 1
  Tilt of binary tree : 0 + 0 + 1 = 1
```

#### 二、题目大意

  &emsp;&emsp;树节点的倾斜度定义为所有左子树节点值的总和与所有右子树节点值的总和之间的绝对差，而整个树的倾斜度定义为所有节点倾斜度之和，求出整个树的倾斜度。

#### 三、解题思路

 &emsp;&emsp;这道题类似于求解二叉树高度，在递归的过程中，向上返回以当前节点为根节点的二叉树的所有节点和，并且不要忘记记录各个子树的倾斜值。

#### 四、代码实现

```JavaScript
const findTilt = root => {
  function postOrder (root) {
    if (!root) {
      return 0
    }
    const left = postOrder(root.left)
    const right = postOrder(root.right)

    sum += Math.abs(left - right)
    return root.val + left + right
  }
  let sum = 0
  postOrder(root)
  return sum
}
```

  
