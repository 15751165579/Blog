# JavaScript 中的基本类型与包装类型

### 一、基本类型

  - number
  - string
  - boolean
  - null
  - undefined
  - symbol

### 二、包装类型

  &emsp;&emsp;包装类型有以下三种：

  - Number
  - Boolean
  - String

  &emsp;&emsp;它的作用主要是，当我们通过该包装类型的基本类型去调用方法时，进行一个隐式处理：

```JavaScript
  (10).toString(2) // 为什么能执行

  // 等同于以下代码
  const n = new Number(10)
  n.toString(2)
```