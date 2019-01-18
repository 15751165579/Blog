/* eslint-disable */
const backspaceCompare = (S, T) => {
  const stack1 = []
  const stack2 = []
  let s = S.length
  let i = 0
  while (i < s) {
    const item = S[i]
    if (item === '#') {
      stack1.pop()
    } else {
      stack1.push(item)
    }
    i++
  }

  let t = T.length
  let j = 0
  while (j < t) {
    
    const item = T[j]
    if (item === '#') {
      stack2.pop()
    } else {
      stack2.push(item)
    }
    j++
  }
  const l1 = stack1.length
  const l2 = stack2.length
  if (l1 !== l2) {
    return false 
  }
  for (let i = 0; i < l1; i++) {
    const x = stack1[i]
    const y = stack2[i]
    if (x !== y) {
      return false
    }
  }

  return true
}