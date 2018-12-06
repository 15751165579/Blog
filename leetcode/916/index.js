/**
 * 916. Word Subsets
 */

const wordSubsets = (A, B) => {

  const ans = []

  const letterHash = {}

  for (let i = 0; i < B.length; i++) {
    const item = counter(B[i])
    for (let key in item) {
      letterHash[key] = Math.max(item[key], letterHash[key] || 0)
    }
  }


  for (let i = 0; i < A.length; i++) {
    const item = counter(A[i])
    let isOk = true
    for (let key in letterHash) {
      const x = item[key] || 0
      const y = letterHash[key]
      if (x < y) {
        isOk = false
        break
      }
    }
    if (isOk) {
      ans.push(A[i])
    }
  }

  return ans

  // 统计每个单词中的字符个数
  function counter (str) {
    const map = {}
    for (let i = 0; i < str.length; i++) {
      const item = str[i]
      if (!map[item]) {
        map[item] = 0
      }
      map[item]++
    }
    return map
  }
}

const A = ["amazon","apple","facebook","google","leetcode"]
const B = ["ec","oc","ceo"]
console.log(wordSubsets(A, B), ["facebook","leetcode"])

const wordSubsets1 = () => {

}

console.log(wordSubsets1(A, B), ["facebook","leetcode"])