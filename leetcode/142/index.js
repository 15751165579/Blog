/**
 * Linked List Cycle II
 */

function ListNode (val) {
  this.val = val
  this.next = null
}
const detectCycle = function (head) {
  let fast = head
  let slow = head

  while (true) {
    if (fast === null || fast.next === null) {
      return null
    }
    slow = slow.next
    fast = fast.next.next
    if (slow === fast) {
      slow = head
      break
    }
  }
  
  while (true) {
    if (slow === fast) {
      return slow
    }
    slow = slow.next
    fast = fast.next
  }
}

const head = new ListNode(1)

console.log(detectCycle(head))