# JavaScript刷LeetCode -- 331. Verify Preorder Serialization of a Binary Tree

#### 一、题目

  &emsp;&emsp;One way to serialize a binary tree is to use pre-order traversal. When we encounter a non-null node, we record the node's value. If it is a null node, we record using a sentinel value such as #.

```s
       _9_
      /   \
     3     2
    / \   / \
   4   1  #  6
  / \ / \   / \
  # # # #   # #
```

  &emsp;&emsp;For example, the above binary tree can be serialized to the string "9,3,4,#,#,1,#,#,2,#,6,#,#", where # represents a null node.

  &emsp;&emsp;Given a string of comma separated values, verify whether it is a correct preorder traversal serialization of a binary tree. Find an algorithm without reconstructing the tree.

  &emsp;&emsp;Each comma separated value in the string must be either an integer or a character '#' representing null pointer.

  &emsp;&emsp;You may assume that the input format is always valid, for example it could never contain two consecutive commas such as "1,,3".

#### 二、题目大意

  &emsp;&emsp;给定二叉树的前序遍历字符串，验证该字符串是否有效，（空节点采用'#'表示）。

#### 三、解题思路

  &emsp;&emsp;这道题参考了[社区大神的解法](https://leetcode.com/problems/verify-preorder-serialization-of-a-binary-tree/discuss/78551/7-lines-Easy-Java-Solution)，简单的理解就是：在遍历的过程中，如果系统的入度大于出度，那么“空闲分支”已经用完，后续节点无法挂载在二叉树上，从而判断字符串是否有效。

#### 四、代码实现

```JavaScript
const isValidSerialization = preorder => {
  const a = preorder.split(',')
  let diff = 1
  for (let item of a) {
    diff -= 1
    if (diff < 0) {
      return false
    }
    if (item !== '#') {
      diff += 2
    } 
  }
  return diff === 0
}
```