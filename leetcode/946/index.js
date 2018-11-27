const validateStackSequences = (pushed, popped) => {
  let max = pushed.length
  let popIndex = 0

  const temp = []
  for (let i = 0; i < max; i++) {
    const item = pushed[i]
    temp.push(item)
    let size = temp.length
    while (size > 0 && temp[size - 1] === popped[popIndex]) {
      temp.pop()
      popIndex++
      size--
    }
  }
  return popIndex === popped.length
}

console.log(validateStackSequences([1, 2, 3, 4, 5], [4, 5, 3, 2, 1]), true)
console.log(validateStackSequences([1, 2, 3, 4, 5], [4, 3, 5, 1, 2]), false)