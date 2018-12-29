# JavaScript刷LeetCode -- 99. Recover Binary Search Tree 【Medium】

#### 一、题目

  &emsp;&emsp;Two elements of a binary search tree (BST) are swapped by mistake.

  &emsp;&emsp;Recover the tree without changing its structure.

#### 二、题目大意

  &emsp;&emsp;二叉搜索树中有两个元素放错位置了，现在需要在不改变树结构的情况下交换两个值。

#### 三、解题思路

  &emsp;&emsp;解决这个问题需要找出这两个错误的元素，对于二叉搜索树，通过中序遍历可以得到一个单调递增的序列，而且题目中只存在两个错误的值，那么在中序遍历的序列中可以找出一个元素是大于后续部分元素的，并且通过不断向后比较找出该元素应该插入的位置，也就是需要和哪个元素进行交换。

#### 四、代码实现

```JavaScript
const recoverTree = root => {
  let x = null
  let y = null
  let pre = null

  traverse(root)

  let temp = x.val
  x.val = y.val
  y.val = temp

  return root

  function traverse (root) {
    if (!root) {
      return
    }
    traverse(root.left)
    if (pre) {
      if (!x && pre.val >= root.val) {
        x = pre
      }
      if (x && pre.val >= root.val) {
        y = root
      }
    }
    pre = root
    traverse(root.right)
  }
}
```