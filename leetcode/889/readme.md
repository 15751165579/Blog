# JavaScript刷LeetCode -- 889. Construct Binary Tree from Preorder and Postorder Traversal [Medium]

#### 一、题目

  &emsp;&emsp;Return any binary tree that matches the given preorder and postorder traversals.

  &emsp;&emsp;Values in the traversals pre and post are distinct positive integers.

#### 二、题目大意

  &emsp;&emsp;根据二叉树的前序和后序序列构建二叉树。(并且序列中无重复的元素，这一点很重要。)

#### 三、解题思路

  &emsp;&emsp;首先需要理解前序遍历和后序遍历：

```s
  前序遍历 root(left)(right)

  后序遍历 (left)(right)root
```

  &emsp;&emsp;对于根节点很容易可以拿到，关键就是找到左子树和右子树的分割点，从而递归构建左右子树。

#### 四、代码实现

```JavaScript
const constructFromPrePost = (pre, post) => {

  if (pre.length === 0) {
    return null
  }
  // 拿出根节点
  const x = pre.shift()
  post.pop()

  const root = new TreeNode(x)

  if (pre.length > 0) {
    // 找到左右子树的分割点，这也是为什么不能存在重复元素的原因。
    const l = pre[0]
    const lIndex = post.indexOf(l)

    root.left = constructFromPrePost(pre.slice(0, lIndex + 1), post.slice(0, lIndex + 1))
    root.right = constructFromPrePost(pre.slice(lIndex + 1), post.slice(lIndex + 1))
  }
  return root
}
```