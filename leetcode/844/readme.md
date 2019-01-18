# JavaScript刷LeetCode -- 844. Backspace String Compare [Easy]

#### 一、题目

  &emsp;&emsp;Given two strings S and T, return if they are equal when both are typed into empty text editors. # means a backspace character.

#### 二、题目大意

  &emsp;&emsp;给定两个字符串s和t，当它们都被输入空文本编辑器时，返回是否相等。#表示退格字符。

#### 三、解题思路

  &emsp;&emsp;采用栈的方式得到输入后的字符串。

#### 四、代码实现

```JavaScript
const backspaceCompare = (S, T) => {
  const stack1 = []
  const stack2 = []
  let s = S.length
  let i = 0
  while (i < s) {
    const item = S[i]
    if (item === '#') {
      stack1.pop()
    } else {
      stack1.push(item)
    }
    i++
  }

  let t = T.length
  let j = 0
  while (j < t) {
    
    const item = T[j]
    if (item === '#') {
      stack2.pop()
    } else {
      stack2.push(item)
    }
    j++
  }
  const l1 = stack1.length
  const l2 = stack2.length
  if (l1 !== l2) {
    return false 
  }
  for (let i = 0; i < l1; i++) {
    const x = stack1[i]
    const y = stack2[i]
    if (x !== y) {
      return false
    }
  }

  return true
}
```