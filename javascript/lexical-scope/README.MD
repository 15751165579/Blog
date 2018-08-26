# 作用域

### 词法作用域

  所谓的词法作用域，就是定义在词法阶段的作用域。

  对于ES5之前，在JavaScript中只有函数作用域，这里我们以函数作用域为例。

  无论函数在哪里调用，怎么调用，它的词法作用域只由函数声明所处的位置决定。

### 动态作用域

```JavaScript
  var a = 'global'

  function boo () {
    eval('var a = "dynamic scope"')
    console.log('boo: ' + a)
  }

  boo() // boo: dynamic scope
```
  
  JavaScript中产生动态作用域的方式有两种: eval和with。

  不推荐使用这两种方法，它们的出现，使引擎对于作用域查找的优化不起任何作用，所以我选择忘记它们。

