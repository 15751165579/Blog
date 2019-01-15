# JavaScript刷LeetCode -- 450. Delete Node in a BST [Medium]

#### 一、题目

  &emsp;&emsp;Given a root node reference of a BST and a key, delete the node with the given key in the BST. Return the root node reference (possibly updated) of the BST.

  &emsp;&emsp;Basically, the deletion can be divided into two stages:

  - Search for a node to remove.
  - If the node is found, delete the node.

#### 二、题目大意

  &emsp;&emsp;删除BST中值为key的节点，并且它仍然是一棵BST。

#### 三、解题思路

  &emsp;&emsp;比较容易想到的思路是：先通过中序遍历获取到有序序列，在删除key，最后利用有序序列结合二分法构建新的BST。

  &emsp;&emsp;遗憾的是，这种方法不能够AC。（题目要求时间复杂度为O(n)）

  &emsp;&emsp;另一种方法是采用递归的方式修改原来的BST，由于BST本来是一个二分的结构，可以通过下列递归推导找出需要删除的节点：

  - 当前节点的值大于key时，那么删除的节点必然在左子树上。
  - 当前节点的值小于key时，那么删除的节点必然在右子树上。

  &emsp;&emsp;接下来就是删除节点，分为两种情况：

  - 待删除的节点同时拥有那么左右子树时，需要从右子树中找出最小值作为当前根节点，此时待删除的节点已经被右子树的最小值替换掉，但是右子树上的最小值仍然存在，所有还需要在右子树上递归执行删除该最小值的操作。
  - 只有当待删除的节点最多有一个左/右子树时，执行的才是删除操作，这时只需要将节点的存在的左或右子树赋值给父节点，即完成删除操作。

#### 四、代码实现

```JavaScript
const deleteNode = (root, key) => {
  if (!root) {
    return root
  }
  if (root.val > key) {
    root.left = deleteNode(root.left, key)
  } else if (root.val < key) {
    root.right = deleteNode(root.right, key)
  } else {
    if (root.left && root.right) {
      // 左右节点都存在的情况下，从右子树中找到一个最小值作为新的根节点
      let min = root.right
      while (min.left) {
        min = min.left
      }
      root.val = min.val
      root.right = deleteNode(root.right, min.val)
    } else {
      // 当前节点只有左子树或者右子树时，直接返回子树即可。
      return (root.left ? root.left : root.right)
    }
  }
  return root
}
```