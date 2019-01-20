# JavaScript刷LeetCode -- 687. Longest Univalue Path

#### 一、解题思路

  &emsp;&emsp;采用递归求解，并且结合二叉树是由左右子树递归形成的特性。

```s
      root
      /  \
    left right
```

  &emsp;&emsp;那么对于一棵二叉树中相同值路径的长度为：左子树中相同值路径的长度 + 右子树中相同值路径的长度。

  &emsp;&emsp;而当二叉树作为另一棵二叉树的子树时，该二叉树中相同值路径是不不能够经过根节点的，所以它此时相同路径的长度应该为：max(左子树中相同值路径的长度, 右子树中相同值路径的长度)。

#### 二、代码实现

```JavaScript
const longestUnivaluePath = root => {
  let ans = 0
  if (!root) {
    return ans
  }

  help(root)
  return ans

  function help (root) {
    if (!root) {
      return 0
    }
    const l = help(root.left)
    const r = help(root.right)

    let pl = 0
    let pr = 0

    if (root.left && root.val === root.left.val) {
      pl = l + 1
    }

    if (root.right && root.val === root.right.val) {
      pr = r + 1
    }
    ans = Math.max(ans, pl + pr)
    return Math.max(pr, pl)
  }
}
```