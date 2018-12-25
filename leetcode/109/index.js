/* eslint-disable */
const sortedListToBST1 = head => {
  var ans = [];
  while (head) {
    ans.push(head.val);
    head = head.next;
  }

  return sortedArrayToBST(ans)

  function sortedArrayToBST (nums) {
    const max = nums.length
    if (max === 0) {
      return null
    }
    const mid = Math.floor(max / 2)
    const root = new TreeNode(nums[mid])
    root.left = sortedArrayToBST(nums.slice(0, mid))
    root.right = sortedArrayToBST(nums.slice(mid + 1, max))
    return root
  }
}

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