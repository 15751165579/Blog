# JavaScript刷LeetCode -- 946.Validate Stack Sequences

#### 一、题目

  Given two sequences pushed and popped with distinct values, return true if and only if this could have been the result of a sequence of push and pop operations on an initially empty stack.

#### 二、题目大意

  给两个数组，pushed数组中的元素执行入栈操作，popped数组中的元素执行出栈操作，如果最终消耗完两个数组，那么就返回true，否则为false

#### 三、解题思路

  这虽然是一道中等难度的题目，但是并不是很难，抓住何时执行出栈操作即可。

#### 四、实现代码

```JavaScript
const validateStackSequences = (pushed, popped) => {
  let max = pushed.length
  let popIndex = 0

  const temp = []
  for (let i = 0; i < max; i++) {
    const item = pushed[i]
    temp.push(item)
    let size = temp.length
    while (size > 0 && temp[size - 1] === popped[popIndex]) {
      temp.pop()
      popIndex++
      size--
    }
  }
  return popIndex === popped.length
}
```