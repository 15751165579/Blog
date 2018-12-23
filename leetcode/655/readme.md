# JavaScript刷LeetCode -- 655. Print Binary Tree【Medium】  

#### 一、题目

  &emsp;&emsp;Print a binary tree in an m*n 2D string array following these rules:

  - The row number m should be equal to the height of the given binary tree.
  - The column number n should always be an odd number.
  - The root node's value (in string format) should be put in the exactly middle of the first row it can be put. The column and the row where the root node belongs will separate the rest space into two parts (left-bottom part and right-bottom part). You should print the left subtree in the left-bottom part and print the right subtree in the right-bottom part. The left-bottom part and the right-bottom part should have the same size. Even if one subtree is none while the other is not, you don't need to print anything for the none subtree but still need to leave the space as large as that for the other subtree. However, if two subtrees are none, then you don't need to leave space for both of them.
  - Each unused space should contain an empty string "".
  - Print the subtrees following the same rules.

```s
  Example 1:
  Input:
       1
      /
     2
  Output:
  [["", "1", ""],
  ["2", "", ""]]
```

#### 二、题目大意

  &emsp;&emsp;以二维数组的方式打印二叉树。

#### 三、解题思路

  &emsp;&emsp;这道题可以算是二叉树分层遍历的一个进阶题目，难点在于节点如何放在数组中的合适位置，从上述例子中，可以发现子树的根节点应该处于当前子树空间的中心位置：

```s
  ["", "", ""] 1 => (0 + 2) / 2  => ["", "1", ""]
  
  而2则为1的左子树的根节点

  [""] 2 => (0 + 0) / 2 => ["2"]
```

#### 四、代码实现

```JavaScript
const printTree = root => {

  const height = getTreeHeight(root)
  const width = (1 << height) - 1

  // 初始化整个数组
  const ans = []
  for (let i = 0; i < height; i++) {
    ans[i] = []
    for (let j = 0; j < width; j++) {
      ans[i].push("")
    }
  }

  // 二分填充
  print(root, ans, 0, 0, width - 1)
  return ans
  function getTreeHeight (root) {
    if (!root) {
      return 0
    }
    return Math.max(getTreeHeight(root.left), getTreeHeight(root.right)) + 1
  }

  function print (root, ans, height, start, end) {
    if (!root) {
      return
    }
    const mid = (start + end) / 2
    ans[height][mid] = String(root.val)
    print(root.left, ans, height + 1, start, mid - 1)
    print(root.right, ans, height + 1, mid + 1, end)
  }

}
```