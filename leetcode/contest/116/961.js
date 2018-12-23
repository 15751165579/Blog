/* eslint-disable */
const repeatedNTimes = A => {
  const max = A.length
  const s = {}
  for (let i = 0; i < max; i++) {
    const item = A[i]
    if (s[item] === undefined) {
      s[item] = 0
    }
    s[item]++
  }
  for (let key in s) {
    if (s[key] === max / 2) {
      return key
    }
  }
}