# JavaScript刷LeetCode -- 916. Word Subsets

#### 一、题目

  We are given two arrays A and B of words.  Each word is a string of lowercase letters.

  Now, say that word b is a subset of word a if every letter in b occurs in a, including multiplicity.  For example, "wrr" is a subset of "warrior", but is not a subset of "world".

  Now say a word a from A is universal if for every b in B, b is a subset of a. 

  Return a list of all universal words in A.  You can return the words in any order.

#### 二、题目大意

  从数组A中找出元素S， 使得其包含数组B中的每一个元素中所有的字符，输出所有满足条件的S。


#### 三、解题思路

  记录B中所有字符串中含有字符的最大数量，记录A中每个元素中含有字符的数量，如果对于任意B中的字符，A不能满足：

```s
  BLetterCount[letter] <= ALetterCount[letter]
```

  那么该元素就不满足条件。

#### 四、代码实现

```JavaScript
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
```

