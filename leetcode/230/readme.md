# JavaScript刷LeetCode -- 230. Kth Smallest Element in a BST [Medium]

#### 一、题目

  &emsp;&emsp;Given a binary search tree, write a function kthSmallest to find the kth smallest element in it.

#### 二、题目大意

  &emsp;&emsp;找出二叉搜索树中第K小的元素。

#### 三、解题思路

  &emsp;&emsp;中序遍历二叉搜索树。

#### 四、代码实现

```JavaScript
const kthSmallest1 = (root, k) => {
  const ans = []

  help(root)

  return ans[k - 1]

  function help (root) {
    if (!root) {
      return 
    }
    help(root.left)
    ans.push(root.val)
    help(root.right)
  }
}
```