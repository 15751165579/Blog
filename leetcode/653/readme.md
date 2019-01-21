# JavaScript刷LeetCode -- 653. Two Sum IV - Input is a BST

#### 一、题目

  &emsp;&emsp;Given a Binary Search Tree and a target number, return true if there exist two elements in the BST such that their sum is equal to the given target.

#### 二、题目大意

  &emsp;&emsp;二叉搜索树中是否存在两个元素的值为k。

#### 三、解题思路

  &emsp;&emsp;把这道题目理解为：

```s
  对于 a + b = k
  
  当找到a或者b时，另一个数是否存在。
```

  &emsp;&emsp;那么通过遍历二叉树来记录节点的值，就可以很轻松的解决。

#### 四、代码实现

```JavaScript
const findTarget = (root, k) => {
  let ans = false
  const s = new Set()

  inOrder(root)
  return ans
  function inOrder (root) {
    if (!root) {
      return
    }

    inOrder(root.left)
    const rest = k - root.val
    if (s.has(rest)) {
      ans = true
      return
    }
    s.add(root.val)
    inOrder(root.right)
  }
}
```