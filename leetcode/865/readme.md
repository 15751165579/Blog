# JavaScript刷LeetCode -- 865. Smallest Subtree with all the Deepest Nodes [Medium]

##### 一、题目

  &emsp;&emsp;Given a binary tree rooted at root, the depth of each node is the shortest distance to the root.

  &emsp;&emsp;A node is deepest if it has the largest depth possible among any node in the entire tree.

  &emsp;&emsp;The subtree of a node is that node, plus the set of all descendants of that node.

  &emsp;&emsp;Return the node with the largest depth such that it contains all the deepest nodes in its subtree.

#### 二、题目大意

  &emsp;&emsp;找出包含所有最深节点的根节点，最深节点的定义：该节点距离二叉树根节点的距离最长。

#### 三、解题思路

  &emsp;&emsp;首先找最深节点的问题可以转化为求解二叉树高度的问题，有了高度信息之后，就会产生以下两种情况：

  - 当前根节点的左右子树一样高，那么就返回当前根节点。
  - 当前根节点的左右子树不一样高，那么返回相对较高的子树的根节点。

  &emsp;&emsp;经过递归处理之后，得到最终的答案。

#### 四、代码实现

```JavaScript
const subtreeWithAllDeepest = root => {

  return help(root)[1]

  function help (root) {
    if (!root) {
      return [-1, null]
    }
    const l = help(root.left)
    const r = help(root.right)

    const lHeight = l[0]
    const rHeight = r[0]

    const h = Math.max(rHeight, lHeight) + 1

    const v = lHeight === rHeight ? root : (lHeight > rHeight ? l[1] : r[1])

    return [h, v]
  }
}
```