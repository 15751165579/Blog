const findAndReplacePattern = function (words, pattern) {
  let ans = []
  for (let i = 0; i < words.length; i++) {
    if (compose(words[i], pattern)) {
      ans.push(words[i])
    }
  }

  return ans
  function compose (element, pattern) {
    const m = new Map()
    const s = new Set()
    for (let i = 0; i < element.length; i++) {
      const x = pattern[i]
      const y = element[i]
      s.add(y)
      if (m.get(x) === undefined) {
        m.set(x, y)
      } else if (m.get(x) !== y) {
        return false
      }
    }
    return m.size === s.size
  }
}

console.log(findAndReplacePattern(["abc","deq","mee","aqq","dkd","ccc"], "abb"), ["mee","aqq"])