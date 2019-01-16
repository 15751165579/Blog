# JavaScript刷LeetCode -- 968. Binary Tree Cameras [Hard]

#### 一、题目

  &emsp;&emsp;Given a binary tree, we install cameras on the nodes of the tree. 

  &emsp;&emsp;Each camera at a node can monitor its parent, itself, and its immediate children.

  &emsp;&emsp;Calculate the minimum number of cameras needed to monitor all nodes of the tree.

#### 二、题目大意

  &emsp;&emsp;给定一个二叉树，我们在树的节点上安装摄像头。节点上的每个摄像头都可以监视其父节点、自身及其子节点。计算监控树的所有节点所需的最少摄像头数量。

#### 三、解题思路

  &emsp;&emsp;采用递归的方式解决这道题目，难点就在于递归向上返回的时候，你需要告诉上层节点，当前节点的状态：

```s
  定义三种状态：
  1 当前节点被覆盖
  2 表示当前节点装上了摄像头
  0 表示当前节点未被覆盖
```

  &emsp;&emsp;而对于当前子节点是否需要安装摄像头，主要分为两种情况：

  - 它的左右子节点存在未被覆盖的情况，那么当前节点需要安装上摄像头。
  - 它的左右子节点存在安装摄像头的情况，那么当前节点已经被覆盖。

#### 四、代码实现

```JavaScript
const minCameraCover = root => {
  let ans = 0
  // 1 当前节点被覆盖 2 表示当前节点装上了摄像头 0 表示当前节点未被覆盖
  if (help(root) === 0) {
    // 二叉树仅有一个根节点组成的情况
    ans++
  }
  return ans
  function help (root) {
    if (!root) {
      return 1
    }
    const l = help(root.left)
    const r = help(root.right)

    if (l === 0 || r === 0) {
      ans++
      return 2
    }
    if (l === 2 || r === 2) {
      return 1
    }
    return 0
  }
}
```