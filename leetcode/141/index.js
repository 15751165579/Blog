/**
 * Linked list Cycle
 */

function ListNode (val) {
  this.val = val
  this.next = null
}

const hasCycle = function (head) {
    if (head === null || head.next === null) {
      return false
    }
    let fast = head
    let slow = head
    while (fast !== null && fast.next !== null) {
      slow = slow.next
      fast = fast.next.next
      if (slow && fast && slow.val === fast.val) {
        return true
      }
    }
    return false
}

const root = new ListNode(1)

root.next = new ListNode(2)

console.log(hasCycle(root))