/**
 * Remove Duplicate Form Sorted List
 */
function ListNode (val) {
  this.val = val
  this.next = null
}

const deleteDuplicates = function (head) {
  if (head === null || head.next === null) {
    return head
  }
  let current = head
  while (current.next !== null) {
    if (current.next.val === current.val) {
      current.next = current.next.next
    } else {
      current = current.next
    }
  }
  return head
}