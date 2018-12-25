# JavaScript刷LeetCode -- 109. Convert Sorted List to Binary Search Tree

#### 一、题目

  &emsp;&emsp;Given a singly linked list where elements are sorted in ascending order, convert it to a height balanced BST. 

  &emsp;&emsp;For this problem, a height-balanced binary tree is defined as a binary tree in which the depth of the two subtrees of every node never differ by more than 1.

#### 二、题目大意

  &emsp;&emsp;将一个有序链表转化为BST。

#### 三、解题思路

  &emsp;&emsp;二分查找的方式不断的递归创建节点，需要这里给的是链表数据结构，相比较数组，在查找中心点以及分割成左右两部分的处理差异性很大。

#### 四、代码实现

```JavaScript
const sortedListToBST = head => {
  if (!head) {
    return null
  }
  if (!head.next) {
    return new TreeNode(head.val)
  }

  const mid = findMid(head)
  const root = new TreeNode(mid.val)

  root.left = sortedListToBST(head)
  root.right = sortedListToBST(mid.next)

  return root

  function findMid (head) {
    let slow = head
    let fast = head
    let slowPre = null
    while (fast && fast.next) {
      slowPre = slow
      slow = slow.next
      fast = fast.next.next
    }
    // 分割链表
    slowPre.next = null
    return slow
  }
}
```