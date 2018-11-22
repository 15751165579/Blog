/**
 * DI String Match
 */
const diStringMatch = (S) => {
  const len = S.length
  if (!len) {
    return []
  }
  let min = 0
  let max = len
  const result = []
  for (let i = 0; i < len; i++) {
    const item = S[i]
    if (item === 'I') {
      result.push(min)
      min++
    } else if (item === 'D') {
      result.push(max)
      max--
    }
  }

  // 最后一位
  result.push(max)
  return result
}

const testcase1 = 'IDID'
console.log(diStringMatch(testcase1))
const t2 = 'III'
console.log(diStringMatch(t2))
const t3 = 'DDI'
console.log(diStringMatch(t3))