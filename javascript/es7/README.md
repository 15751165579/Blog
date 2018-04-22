# 这可能是你学习ES7遗漏的知识点

> 小云是一枚还没有脱发的程序员，最近看到ES热度这么高，决定蹭一波热度。

## ES7新增的特性

- Array.prototype.includes
- **

## **

小云首先看到了ES7中新增的**运算符，心中暗喜：这么简单？

```JavaScript
  8 ** 3 // 512
  Math.pow(8, 3) // 512
```
但是小云喜欢瞎折腾，于是他又敲了下列代码：

```JavaScript
  2 ** 2 ** 0 // 2
```
结果竟然是2，小云带着疑惑查了查资料，原来**运算符是右结合的：

```JavaScript
  (2 ** 2) ** 0 // 1
```

小云终于得到了自己预期的结果，而且还发现了底数的前面不能紧跟一元运算符，即使是+也不行。

## Array.prototype.includes

> Tip: 为什么这个方法不叫contains呢？因为一些[Bug](https://bugzilla.mozilla.org/show_bug.cgi?id=1102219)，它被重命名为includes

接下来，小云开始学习includes方法：

```JavaScript
  [1, 2, 1].includes(1) // true
```

小云又敲下了之前用来判断数组中的元素是否存在的代码：

```JavaScript
  if ([1, 2, 1].indexOf(1) !== -1) {
    // true
  }
```
哇！终于可以摆脱那个令人讨厌的!== -1了。

难道这两个方法仅仅是在返回值上有区别吗？小云这次决定不再瞎折腾，直接移步[ES7文档](http://www.ecma-international.org/ecma-262/7.0/)。

数个小时之后，小云要开始他的表演了。

## ES标准的相等比较算法

- The Abstract Equality Comparison Algorithm (==)
- The Strict Equality Comparison Algorithm (===)
- SameValue (Object.is())
- SameValueZero (暂未提供API)

对于前两个大家再熟悉不过了，在我刚学JS的时候，只是通过自己长期累积的经验去区别两者的差异:

```JavaScript
  [1, 2, 3] == '1,2,3' // true
  ['1'] == 1 // true
```
以至于遇到上述情况惊叹不已，但是了解原理之后，一切变得那么的简单。

### The Abstract Equality Comparison Algorithm

- 当类型相同时，特殊性在于NaN, -0, 0。
```JavaScript
  NaN == NaN // false
  -0 == 0 // true
```
- 当类型不同时，第一条准则是：null与undefined相等
- 当类型不同时，第二条准则是：所有的比较最终多会转化为数值的比较，而它转化的优先级是Boolean => Object => String

前面两条不难理解，通过['1'] == true比较的过程，熟悉一下第三条规则:

- 将右边的Boolean类型转化为Number类型, 转化为 ['1'] == 1
- 将左边的Object类型转化为原始值，转化为 '1' == 1
- 将左边的String类型转化为Number类型, 转化为 1 == 1

这时你再遇到：

```JavaScript
  [] == false // true
```

是不是很轻松就知道结果了。

### The Strict Equality Comparison Algorithm

对于这个算法需要注意的地方是在Number类型的比较上：

```JavaScript
  NaN === NaN // false
  -0 === 0 // true
```
> Tip: 上述方法的分析多是基于ES5.1，在ES6中都有细微的改变，比如加入Symbol的比较。

### SameValue

对于熟练使用ES6的小伙伴，多知道Object.is()这个方法：

```JavaScript
  Object.is(NaN, NaN) // true
  Object.is(0, -0) // false
```

而Object.is内部采用的比较算法就是SameValue(x, y)，而它与 === 的区别也正是这两种情况。

### SameValueZero

但是你在使用es6中有没有疑惑这种情况：

```JavaScript
  const s = new Set()
  s.add(0)
  s.add(NaN)
  s.has(-0) // true
  s.has(NaN) // true
```
是不是与上述的三种算法的表现多不一样，这就是第四种比较算法SameValueZero，它与SameValue的区别主要在于0与-0是否相等。

所以你在实践includes方法时，遇到：

```JavaScript
  const a = [0, NaN]
  a.includes(-0) // true
  a.includes(NaN) // true
```

就不用大惊小怪了，因为includes内部使用的比较算法就是SameValueZero。

## 参考文献

- [ECMAScript 5.1](http://www.ecma-international.org/ecma-262/5.1/)
- [ECMAScript 6.0](http://www.ecma-international.org/ecma-262/6.0/)
- [ECMAScript 7.0](http://www.ecma-international.org/ecma-262/7.0/)
