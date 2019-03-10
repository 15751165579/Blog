### 前端小贴士 -- 类数组

### 一、类数组

  &emsp;&emsp;类数组主要指的是一个对象含有数字下标属性值和length属性并且length的值为正整数。

  &emsp;&emsp;在JavaScript中常见的类数组有：DOM元素结合和arguments。

```JavaScript
const s = document.querySelectorAll('li')
Array.isArray(s) === false // true


function demo () {
  Array.isArray(arguments) === false // true
}
demo(1, 2, 3)
```

  &emsp;&emsp;它们虽然都可以通过下标访问元素值，但是无法使用Array.prototype上的方法。

### 二、判断类数组

  &emsp;&emsp;判断类数组的标准主要有下列几点：
  
  - 类数组是一个对象。
  - 类数组含有长度属性值，并且该值是一个正整数。

```JavaScript
  function isArrayLike (o) {
    if (
      o && typeof o === 'object' && 
      isFinite(o.length) && 
      o.length >= 0 && 
      o.length < Math.pow(2, 32) && 
      o.length === Math.floor(o.length)) {
      return true
    }
    return false
  }
```

### 三、类数组转化为数组

  &emsp;&emsp;前面提到了类数组无法使用Array.prototype上的方法，但是在实际开发过程中，需要赋予类数组这些方法，就必须将类数组转化为数组。

##### 1、ES5中处理的方法

  &emsp;&emsp;利用apply和call方法：

```JavaScript
  const a1 = Array.prototype.slice.call(s)
  Array.isArray(a1) // true
```

##### 2、ES6中的Array.from()

  &emsp;&emsp;在ES6中直接提供了类数组转化为数组的方法：

```JavaScript
  const a2 = Array.from(s)
  Array.isArray(a2) // true
```

##### 3、ES6扩展运算符

  &emsp;&emsp;另外ES6中的扩展运算符同样可以将类数组转化为数组：

```JavaScript
  const a3 = [...s]
  Array.isArray(a3) // true
```

### 四、总结

  &emsp;&emsp;在实际开发中遇到遇到类数组的主要常见就是：NodeList和arguments。不过进入ES6语法时代，将类数组转化为数组的方式不再那么难懂，而且随着ES6中大量新增特性，类数组处理的场景也大大减少，例如函数的参数的新语法，减少了arguments的使用：

```JavaScript
function demo (...a) {
  Array.isArray(a) // true
  console.log(a) // [1, 2, 3]
}

demo(1, 2, 3)
```

  &emsp;&emsp;但是类数组依然是JavaScript中很重要的概念。