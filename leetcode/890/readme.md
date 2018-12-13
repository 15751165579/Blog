# JavaScript刷LeetCode -- 890. Find and Replace Pattern

#### 一、题目

  You have a list of words and a pattern, and you want to know which words in words matches the pattern.

  A word matches the pattern if there exists a permutation of letters p so that after replacing every letter x in the pattern with p(x), we get the desired word.

  (Recall that a permutation of letters is a bijection from letters to letters: every letter maps to another letter, and no two letters map to the same letter.)

  Return a list of the words in words that match the given pattern. 

  You may return the answer in any order.

#### 二、题目大意

  根据pattern字符串，在数组words找出模式相匹配的字符串。

#### 三、解题思路

  本题比较简单

#### 四、代码实现

```JavaScript
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
```