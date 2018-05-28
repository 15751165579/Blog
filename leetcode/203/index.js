/**
 * Remove Linked List Elements
 * 
 * 1 -> 2 -> 3 -> 4
 * 
 * 0 -> 1 -> 2 -> 3 -> 4
 */
const removeElements = function (head, val) {
  if (head === null) {
    return null
  }

  let newHead = new ListNode(0)
  newHead.next = head
  let pre = newHead

  while (head !== null) {
    if (head.val === val) {
      pre.next = head.next
    } else {
      pre = pre.next
    }
    head = head.next
  }

  return newHead.next
}