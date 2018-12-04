# JavaScript刷LeetCode -- 921. Minimum Add to Make Parentheses Valid

#### 一、题目

  Given a string S of '(' and ')' parentheses, we add the minimum number of parentheses ( '(' or ')', and in any positions ) so that the resulting parentheses string is valid.

  Formally, a parentheses string is valid if and only if:

  - It is the empty string, or
  - It can be written as AB (A concatenated with B), where A and B are valid strings, or
  - It can be written as (A), where A is a valid string.

  Given a parentheses string, return the minimum number of parentheses we must add to make the resulting string valid.

#### 二、题目大意

  给定一个字符串S，它其中只包含'('和')'，当字符中的所有的'('有相关联的')'，那么这个字符串就是一个有效字符串，对于S可以采用添加'('或者')'的操作使得其成为一个有效字符串的最小操作次数。

#### 三、解题思路

  读懂题意之后，很好解决这道题目，就是让我们去构造'()'，并且它是可以嵌套的。

  而在字符串S中只有当左边有'('的情况，右边的')'才能形成一个有效的关联，所以只要统计出不能形成有效关联的'('和')'的个数，即为题目结果。

#### 四、代码实现

```JavaScript
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
```
