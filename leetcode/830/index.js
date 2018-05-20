/**
 * Positions of Large Groups
 */
const largeGroupPositions = function (S) {
  const max = S.length
  if (max === 0) {
    return []
  }
  const result = []
  let start = 0
  let end = 0
  let str = S[0]
  for (let i = 1; i < max; i++) {
    const item = S[i]
    if (item === str) {
      end = i
      if (i !== max - 1) {
        continue
      }
    }
    str = item
    const len = end - start + 1
    if (len >= 3) {
      result.push([start, end])
    }
    start = end = i
  }
  return result
}
console.log(largeGroupPositions('aaa'))
console.log(largeGroupPositions('abbxxxxzzy'))
console.log(largeGroupPositions('abc'))
console.log(largeGroupPositions('abcdddeeeeaabbbcd'))