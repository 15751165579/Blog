# JavaScript刷LeetCode -- 129. Sum Root to Leaf Numbers [Medium]

#### 一、题目

  &emsp;&emsp;Given a binary tree containing digits from 0-9 only, each root-to-leaf path could represent a number.

  &emsp;&emsp;An example is the root-to-leaf path 1->2->3 which represents the number 123.

  &emsp;Find the total sum of all root-to-leaf numbers.

  &emsp;Note: A leaf is a node with no children.

#### 二、题目大意

```s
    1
   / \
  2   3 
```

  &emsp;&emsp;以上述二叉树为例，从根节点到子节点的路径分别为:

  - 1 -> 2 对应的值为12
  - 1 -> 3 对应的值为13

  &emsp;&emsp;那么根节点到所有叶子节点的和值即为12 + 13 = 25

  &emsp;&emsp;根据以上规则求解根节点到所有叶子节点的和值。

#### 三、解题思路

  &emsp;&emsp;递归求解子节点的和值。

#### 四、代码实现

```JavaScript
const sumNumbers = (root) => {
  return help(root, 0)
  function help (root, sum) {
    if (!root) {
      return 0
    }
    if (!root.left && !root.right) {
      return root.val + sum * 10
    }
    sum = root.val + sum * 10

    return help(root.left, sum) + help(root.right, sum)
  }
}
```