// 921. Minimum Add to Make Parentheses Valid

const minAddToMakeValid = (S) => {
  const max = S.length
  if (max === 0) {
    return 0
  }
  if (max === 1) {
    return 1
  }
  let i = 0 // 记录左边括号
  let j = 0 // 记录右边括号
  let start = 0
  while (start < max) {
    const item = S[start++]
    if (item === '(') {
      i++
    } else {
      if (i > 0) {
        // 消除
        i--
      } else {
        j++
      }
    }
  }
  return i + j
}

console.log(minAddToMakeValid('())'), 1)
console.log(minAddToMakeValid("((("), 3)
console.log(minAddToMakeValid("()"), 0)
console.log(minAddToMakeValid("()))(("), 4)