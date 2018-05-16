/**
 * 87、Scramble String
 */
const s1 = 'rgeat'
const s2 = 'great'
const isScramble = function (s1, s2) {
  const len1 = s1.length
  const len2 = s2.length
  if (len1 === 1 && s1 === s2) {
    return true
  }
  console.log(' ======== 子串比较 ========= ')
  console.log(`${s1} | ${s2}`)
  const orderS1 = s1.split('').sort().join('')
  const orderS2 = s2.split('').sort().join('')
  if (orderS2 !== orderS1) {
    return false
  }
  for (let i = 1; i < len1; i++) {
    console.log(' ========== 分割 =========== ')
    console.log(`${s1.substring(0, i)} ${s1.substring(i, len1)} | ${s2.substring(0, i)} ${s2.substring(i, len1)}`)
    const lChild = s1.substring(0, i)
    const rChild = s1.substring(i, len1)
    
    const l1 = s2.substring(0, i)
    const r1 = s2.substring(i, len1)
    const l2 = s2.substring(0, len1 - i)
    const r2 = s2.substring(len1 - i, len1)
    if ((isScramble(lChild, l1) && isScramble(rChild, r1)) || (isScramble(lChild, r2) && isScramble(rChild, l2))) {
      return true
    }
  }
  return false
}

console.log(isScramble(s1, s2))
console.log(isScramble('abcde', 'caebd'))
console.log(isScramble('abb', 'bba'))
