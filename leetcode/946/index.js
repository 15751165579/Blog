const validateStackSequences = (pushed, popped) => {
  let max = pushed.length

  let pushIndex = 0
  let popIndex = 0

  const result = []

  while (pushIndex <= max && popIndex <= max) {
    const p1 = pushed[pushIndex]
    const p2 = popped[popIndex]
    const item = result[result.length - 1]
    if (item !== p2) {
      result.push(p1)
      pushIndex++
      continue
    } else if (item === p2) {
      result.pop()
      popIndex++
      continue
    }
  }
  if (result.length === 0 && pushIndex === max && popIndex === max + 1) {
    return true
  }
  return false
}

console.log(validateStackSequences([1, 2, 3, 4, 5], [4, 5, 3, 2, 1]), true)
console.log(validateStackSequences([1, 2, 3, 4, 5], [4, 3, 5, 1, 2]), false)