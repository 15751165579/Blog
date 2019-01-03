# JavaScript刷LeetCode -- 671. Second Minimum Node In a Binary Tree

#### 一、题目

  &emsp;&emsp;Given a non-empty special binary tree consisting of nodes with the non-negative value, where each node in this tree has exactly two or zero sub-node. If the node has two sub-nodes, then this node's value is the smaller value among its two sub-nodes.

  &emsp;&emsp;Given such a binary tree, you need to output the second minimum value in the set made of all the nodes' value in the whole tree.

  &emsp;&emsp;If no such second minimum value exists, output -1 instead.

#### 二、题目大意

  &emsp;&esmp;找出二叉树中第二小的值，如果不存在返回-1。

#### 三、解题思路

  &emsp;&emsp;最朴素的解法是通过递归遍历二叉树，再从获取到的数组中寻找第二小的值。

```JavaScript
const findSecondMinimumValue = root => {
  const ans = []
  help(root)

  ans.sort((next, pre) => next - pre)

  const max = ans.length

  if (max <= 1) {
    return -1
  }

  let x = ans[0]

  for (let i = 1; i < max; i++) {
    const temp = ans[i]
    if (temp !== x) {
      return temp
    }
  }

  return -1

  function help (root) {
    if (!root) {
      return
    }
    ans.push(root.val)
    help(root.left)
    help(root.right)
  }
}
```

  &emsp;&emsp;社区中[还有一种递归求解的方法](https://leetcode.com/problems/second-minimum-node-in-a-binary-tree/discuss/107158/Java-divide-and-conquer-solution)

#### 四、代码实现

```JavaScript
const findSecondMinimumValue = root => {

  if (!root) {
    return -1
  }

  if (!root.left && !root.right) {
    return -1
  }

  let left = root.left.val
  let right = root.right.val

  if (root.left.val === root.val) {
    left = findSecondMinimumValue(root.left)
  }
  if (root.right.val === root.val) {
    right = findSecondMinimumValue(root.right)
  }

  if (left !== -1 && right !== -1) {
    return Math.min(left, right)
  } else if (left != -1) {
    return left
  } else {
    return right
  }
}
```