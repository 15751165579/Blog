# JavaScript刷LeetCode -- 106. Construct Binary Tree from Inorder and Postorder Traversal

#### 一、题目

&emsp;&emsp;Given inorder and postorder traversal of a tree, construct the binary tree.

&emsp;&emsp;Note:
&emsp;&emsp;You may assume that duplicates do not exist in the tree.

&emsp;&emsp;For example, given

```s
  inorder = [9,3,15,20,7]
  postorder = [9,15,7,20,3]
  Return the following binary tree:

     3
    / \
   9  20
      /  \
     15   7
```

#### 二、题目大意

  &emsp;&emsp;根据二叉树的中序遍历和后序遍历构造一颗二叉树。

#### 三、解题思路

  &emsp;&emsp;这道题需要从这两个遍历数组找出规律：

```
  9     3     15 20 7
  left  root  right

  9     15 7 20  3
  left  right    root
```

  &emsp;&emsp;后序遍历数组的最后一位为根节点，然后通过当前的根节点可以将中序遍历数组分成左右两个子树的中序遍历数组，再根据该下标将后序遍历数组也分成左右子树的后序遍历数组，递归得出结果。

#### 四、代码实现

```JavaScript
const buildTree = (inorder, postorder) => {
  if (!inorder) {
    return null
  }

  const val = postorder.pop()
  const root = new TreeNode(val)
  const index = inorder.indexOf(val)
  root.left = buildTree(inorder.slice(0, index), postorder.slice(0, index))
  root.right = buildTree(inorder.slice(index + 1), postorder.slice(index))
  return root
}
```