const reverseOnlyLetters = function (S) {
  const max = S.length
  let start = 0
  let end = max - 1
  let preStr = ''
  let sufStr = ''
  while (start < end) {
    const startItem = S[start]
    const endItem = S[end]
    const s = /[a-zA-Z]/g.test(startItem)
    const e = /[a-zA-Z]/g.test(endItem)
    if (s && e) {
      preStr += endItem
      sufStr = startItem + sufStr
      start++
      end--
    } else if (!s) {
      preStr += startItem
      start++
    } else if (!e) {
      sufStr = endItem + sufStr
      end--
    }
  }
  // 奇数的情况下
  if (end === start) {
    preStr += S[start]
  }
  return preStr + sufStr
}

const testCase = 'Test1ng-Leet=code-Q!'
console.log(reverseOnlyLetters(testCase), 'Qedo1ct-eeLg=ntse-T!')