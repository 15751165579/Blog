### 前端小贴士 -- 数组空位与初始化

### 一、数组的创建

  &emsp;&emsp;在讨论数组初始化之前，首先要知道数组的两种创建方式：

  - 构造函数的创建方式 const a = new Array(2)
  - 数组字面量语法 const b = [1, 1]

  &emsp;&emsp;以上两种数组创建的方式都可能产生数组空位，例如：

```JavaScript
  const s1 = new Array(10)
```

  &emsp;&emsp;上述虽然创建了一个长度为10的数组，但是在控制台打印的结果为：

```s
  (10) [empty × 10]
```

  &emsp;&emsp;这里的empty就是数组中的空位，通常含有数组空位的数组称为稀疏数组，相反的，没有数组空位的数组称为密集数组。那么数组空位会造成什么影响呢？

```JavaScript
  const s2 = s1.map(() => 1)
```

  &emsp;&emsp;上述代码中，我们想通过map方法对s1进行遍历返回一个值全为1的数组，但是最终s2打印出来仍然是一个含有10个数组空位的数组。

  &emsp;&emsp;这里可以查看V8中关于map方法的实现：

```JavaScript
function ArrayMap(f, receiver) {
  CHECK_OBJECT_COERCIBLE(this, "Array.prototype.map");

  // Pull out the length so that modifications to the length in the
  // loop will not affect the looping and side effects are visible.
  var array = TO_OBJECT(this); // （1）转化为对象
  var length = TO_LENGTH(array.length); // （2）获取长度用于for循环
  if (!IS_CALLABLE(f)) throw %make_type_error(kCalledNonCallable, f);
  var result = ArraySpeciesCreate(array, length);
  for (var i = 0; i < length; i++) {
    if (i in array) { // （3）判断该下标是否存在数组对象中
      var element = array[i];
      %CreateDataProperty(result, i, %_Call(f, receiver, element, i, array));
    }
  }
  return result;
}
```

  &emsp;&emsp;结合上述源码可以发现数组空位本质上就是没有向数组对象中加入该下标的属性名，从而导致无法执行该下标的操作。

  &emsp;&emsp;下面是数组空位对数组方法的影响：

  - forEach()，filter()，every()，some()忽略数组空位的处理。
  - map()虽然同样忽略数组空位的处理，但是返回的数组中仍然含有这个空位。
  - join()和toString()将数组转化为字符串时，数组空位转化为空字符串。
  - ES6的方法则是将数组空位转化为undefined处理。

  &emsp;&emsp;最好的方法是在数组的创建过程中，减少产生数组空位的情况，但是有时候无法避免数组空位，例如采用Array构造函数传入数组长度的方式创建数组，就需要结合上述总结的情况，从而避免数组空位的影响。

### 二、数组初始化

  &emsp;&emsp;以初始化一个长度为10并且元素值为下标值的数组为例。

##### 1、for循环

  &emsp;&emsp;最简单的方法就是采用for循环：

```JavaScript
  const demo1 = []
  for (let i = 0; i < 10; i++) {
    demo1[i] = i
  }
```

  &emsp;&emsp;对于该for循环还可以采用花哨一点的写法：

```JavaScript
  const demo2 = []
  for (let i = 0; i < 10; demo2[i++] = i - 1);
```

##### Array构造函数 + ES6方法处理空位

  &emsp;&emsp;在前面一节中，我们知道ES5中函数式的遍历方法都会忽略数组空位的处理，那么就需要通过ES6方法将数组空位转化掉，再采用ES5中函数式的遍历方法赋值。

  &emsp;&emsp;第一种，Array.from() + map()

```JavaScript
  Array.from(new Array(10)).map((item, index) => index)
```

  &emsp;&emsp;第二种，fill() + map()

```JavaScript
  new Array(10).fill(0).map((item, index) => index)
```

  &emsp;&emsp;第三种，ES6扩展运算符（...） + map()

```JavaScript
  [...new Array(10)].map((item, index) => index)
```

##### 利用类数组的奇技淫巧

  &emsp;&emsp;除了上述两大处理方法之外，还有一种是结合类数组转化为数组的奇技淫巧。

```JavaScript
  Array.from({ length: 10 }).map((item, index) => index)
```

  &emsp;&emsp;在ES5中可以采用apply方法进行同样的处理：

```JavaScript
  Array.apply(this, { length: 10 }).map((item, index) => index)
```

### 三、总结

  &emsp;&emsp;数组空位在ES5和ES6中表现的差异性很大，从上述数组初始化的操作中，可以发现当数组空位发生时，需要先处理数组空位，才能避免数组空位对于ES5中一些函数式的遍历方法所造成的影响。





