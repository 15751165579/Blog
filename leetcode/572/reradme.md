# JavaScript刷LeetCode -- 572. Subtree of Another Tree

#### 一、题目

&emsp;&emsp;Given two non-empty binary trees s and t, check whether tree t has exactly the same structure and node values with a subtree of s. A subtree of s is a tree consists of a node in s and all of this node's descendants. The tree s could also be considered as a subtree of itself.

```s
  Example 1:
  Given tree s:

       3
      / \
     4   5
    / \
   1   2
  Given tree t:
     4 
    / \
   1   2
  Return true, because t has the same structure and node values with a subtree of s.
  Example 2:
  Given tree s:

       3
      / \
     4   5
    / \
   1   2
      /
     0
  Given tree t:
     4
    / \
   1   2
  Return false.
```

#### 二、题目大意

  给定一个二叉树t，判断它是否为二叉树s的子树，一个树的子树定义为：一个节点和该节点所有子树组成的树。

#### 三、解题思路

  从子树的定义可以将这道题转化为s中是否存在以一个节点为根的树是否与t相等的问题。

#### 四、代码实现

```JavaScript
const isSubtree = (s, t) => {

  if (!s) {
    return false
  }

  if (isSame(s, t)) {
    return true
  }

  return isSubtree(s.left, t) || isSubtree(s.right, t)

  function isSame (s, t) {
    if (!s && !t) {
      return true
    }
    if (!s || !t) {
      return false
    }
    if (s.val !== t.val) {
      return false
    }
    return isSame(s.left, t.left) && isSame(s.right, t.right)
  }
}
```