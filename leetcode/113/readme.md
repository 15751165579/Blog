# JavaScript刷LeetCode -- 113. Path Sum II [Medium]

#### 一、题目

  &emsp;&emsp;Given a binary tree and a sum, find all root-to-leaf paths where each path's sum equals the given sum.

#### 二、题目大意

  &emsp;&emsp;给定一个二叉树和一个和，找到所有根到叶路径，其中每个路径的和等于给定的和。

#### 三、解题思路

  &emsp;&emsp;采用递归遍历二叉树的方法，在递归的过程中，记录当前节点所对应的和值以及拼接当前路径，当节点的和值为0并且为叶子节点时，则此条路径满足条件。

#### 四、代码实现

```JavaScript
const pathSum = (root, sum) => {
  const ans = []
  help(root, sum, '')
  return ans
  function help (root, sum, path) {
    if (!root) {
      return
    }
    const rv = root.val

    // 计算当前节点的和值
    sum -= rv
    // 拼接路径
    if (path) {
      path += `,${rv}`
    } else {
      path += rv
    }
    // 当前节点和值为零，并且是叶子节点
    if (sum === 0 && !root.left && !root.right) {
      ans.push(path.split(','))
      return
    }

    help(root.left, sum, path)
    help(root.right, sum, path)
  }
}
```