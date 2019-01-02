# JavaScript刷LeetCode -- 95. Unique Binary Search Trees II

#### 一、题目

  &emsp;&emsp;Given an integer n, generate all structurally unique BST's (binary search trees) that store values 1 ... n.

#### 二、题目大意

  &emsp;&emsp;给定一个整数n,请给出由1~n序列组成的二叉搜索树的所有情况。

#### 三、解题思路

  &emsp;&emsp;这道题与[96 Unique Binary Search Trees](https://blog.csdn.net/dai_qingyun/article/details/85651911)不同点在于需要给出具体的子树，那么这道题目不能再采用动态规划的方式，可以采用递归的方式。

#### 四、代码实现

```JavaScript
var generateTrees = function(n) {

  return help(1, n)

  function help (min, max) {
    const result = []
    if (min > max) {
      return result
    }

    for (let mid = min; mid <= max; mid++) {
      // 得到左右子树
      const leftTree = help(min, mid - 1)
      const rightTree = help(mid + 1, max)

      const llen = leftTree.length
      const rlen = rightTree.length

      if (llen === 0 && rlen === 0) {
        // 左右子树为空的情况
        const root = new TreeNode(mid)
        result.push(root)
      } else if (llen === 0) {
        // 只有右子树的情况
        for (let i = 0; i < rlen; i++) {
          const root = new TreeNode(mid)
          root.right = rightTree[i]
          result.push(root)
        }
      } else if (rlen === 0) {
        // 只有左子树的情况
        for (let i = 0; i < llen; i++) {
          const root = new TreeNode(mid)
          root.left = leftTree[i]
          result.push(root)
        }
      } else {
        // 左右子树组合的情况
        for (let i = 0; i < llen; i++) {
          for (let j = 0; j < rlen; j++) {
            const root = new TreeNode(mid)
            root.left = leftTree[i]
            root.right = rightTree[j]
            result.push(root)
          }
        }
      }
    }

    return result
  }
}
```