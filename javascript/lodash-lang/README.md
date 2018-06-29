# 函数参数默认值与类型转化

## 一、函数默认值

  对于函数默认值的写法，到目前为止应该有3中写法：

### 1、逻辑或

```JavaScript
  function example (a) {
    a = a || 'default value'
  }
```

  这种写法看起来挺帅的，但也会带来副作用，比如0或者''可能正是合法的值，但是被误判了。

> JavaScript转化为false的情况: 0,-0,NaN,false,'',undefined,null

### 2、ES6中的函数默认值写法

```JavaScript
  function example (a = 'default value') {}
```

  这种方式主要应用于参数为undefined的情况，但是在大部分情况下，我们认为undefined和null多是空值。

### 3、过滤掉undefined和null

```JavaScript
  function isDef (obj) {
    return (obj !== undefined && obj !== null)
  }
  function example (a) {
    a = isDef(a) ? a : 'default value'
  }
```

## 二、类型转化

  再说类型转化时，我们应该要知道如何去判断：

```JavaScript
  function type (obj) {
    return Object.prototype.toString.call(obj).replace(/^\[object\s(\w+)\]$/g, '$1').toLowerCase()
  }
```

  在ES6中，我们再使用Symbol.toStringTag对自定义对象类型进行定义，基本上在类型判断上不会存在什么问题。

```JavaScript
  class Student {
    get [Symbol.toStringTag] () {
      return 'Student'
    }
  }
```

  接下来我们看一下相关类型的转化:

### 1、Boolean

  对于Boolean值的转化，前面已经说了那几种情况，但是在转化的方式却有炫酷的写法：

```JavaScript
  !!(20) // true
```

### 2、String

  对于字符串的转化，我们一般多采用+拼接字符串来转化，但是有一个需要注意的地方:

```JavaScript
  '' + -0 // '0'
```

  对于-0我们需要特别处理:

```JavaScript
  // lodash 内部实现
  function toStringNegativeZero (n) {
    return (1 / n === -Infinity) ? '-0' : '' + n
  }
  toStringNegativeZero(-0) // '-0'
```

### 3、Number

  对于数字的转化我们需要考虑的问题就多了，首先就是头疼的NaN:

```JavaScript
  isNaN(NaN) // true
```

  利用NaN自身不相等的特性，我们也能写一个判断NaN的方法：

```JavaScript
  function isNaN (number) {
    number = Number(number)
    return number !== number
  }
```

  除了NaN，我们处理Number类型是还要考虑到Infinity。

  在数字转化上，系统提供了Number(),parseInt(),parseFloat()供我们使用，但是对于一些特殊要求，可能它们并不够用，例如将当前对象转化为整数：

```JavaScript
  ~~('sads23sdsd') // 0
  ~~-23.78 // -23
```

  可能你还会看到这样的代码:

```JavaScript
  20.89 >>> 0 // 20
```

  这个就能随便用了，你要知道它是无符号右移位运算符，对于负数并不能到我们所要的取整效果。

### 4、Array

  另一个使用比较多的就是数组的转化，比如我们需要操作arguments时：

```JavaScript
  function some () {
    const arr = Array.prototype.slice.call(arguments)
    console.log(type(a)) // array
  }
```

  通过这种我们方法我们成功的将arguments类数组成功转化为数组，随着ES标准的发展，现在将类数组转化为数组的方法还有:

```JavaScript
  function some () {
    const b = Array.from(arguments)
    const c = [...arguments]
    console.log(type(b)) // array
    console.log(type(c)) // array
  }
```