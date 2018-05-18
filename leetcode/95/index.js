/**
 * Unique Binary Search Tree II
 */
/**
 * Definition for a binary tree node.
 */

function TreeNode(val) {
  this.val = val;
  this.left = this.right = null;
}
/**
 * @param {number} n
 * @return {TreeNode[]}
 */
var generateTrees = function(n) {
  return generateTree(1, n)
  function generateTree (min, max) {
    const trees = []
    
    if (min > max) {
      return trees
    }

    for (let mid = min; mid <= max; mid++) {
      const leftChild = generateTree(min, mid - 1)
      const rightChild = generateTree(mid + 1, max)
      if (leftChild.length === 0 && rightChild.length === 0) {
        const root = new TreeNode(mid)
        trees.push(root)
      } else if (leftChild.length === 0) {
        for (let i = 0; i < rightChild.length; i++) {
          const root = new TreeNode(mid)
          root.right = rightChild[i]
          trees.push(root)
        }
      } else if (rightChild.length === 0) {
        for (let i = 0; i < leftChild.length; i++) {
          const root = new TreeNode(mid)
          root.left = leftChild[i]
          trees.push(root)
        }
      } else {
        for (let i = 0; i < leftChild.length; i++) {
          for (let j = 0; j < rightChild.length; j++) {
            const root = new TreeNode(mid)
            root.left = leftChild[i]
            root.right = rightChild[j]
            trees.push(root)
          }
        }
      }
    }
    return trees
  }
}

console.log(generateTrees(3))