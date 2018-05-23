# JavaScript中的类型判断，了解一下？

> 在前端项目中，谁还没有被对象类型错误坑过？

### typeof操作符

  通过typeof操作符获取操作数的类型：

```JavaScript
  typeof undefined; // undefined
  typeof []; // object
  typeof '123'; // string
```

  关于typeof操作符，我们需要记住两点，第一点：当操作数为null时。

```JavaScript
  typeof null; // object
```

  第二点：当操作数为原始类型(Primitive)时很有效，但是对于对象具体类型的判断往往并不是我们需要的结果。

> Tip: 6大原始类型Null、Undefined、String、Number、Boolean和Symbol。

```JavaScript
  typeof '123'; // string
  typeof new String('123'); // object
```

> Tip: 刚开始学习JS时，常听说：“JS中万物皆对象”，实际上这里的万物并不包含这里的Primitive Value。

### instanceof操作符

  instanceof操作符主要用来检查构造函数的原型是否在对象的原型链上。

```JavaScript
  const s = new String('123');

  s instanceof String; // true
  s instanceof Object; // true
```

  接下来让我们搞点事情：

```JavaScript
  s.__proto__ = Object.prototype;

  s instanceof String; // false
  s instanceof Object; // true
```

  利用instanceof操作符，我们可以对自定义的对象进行判断：

```JavaScript
  function Animal (name) {
    this.name = name
  }

  const fizz = new Animal('fizz');

  fizz instanceof Animal // true
```

### constructor属性

  实际上我们也可以通过constructor属性来达到类型判断的效果：

```JavaScript
  fizz.constructor === Animal // true
```

  但是在实际情况下，constructor属性可以被随意修改，而且你在原型继承中，很容易忽略掉constructor的正确指向：

```JavaScript
  function Rabbit (name) {
    Animal.call(this, name)
  }

  Rabbit.prototype = Object.create(Animal.prototype);
  // 需要手动设置constructor的正确指向
  Rabbit.prototype.constructor = Rabbit;

  const rabbit = new Rabbit('🐰');

  rabbit.constructor === Rabbit // true
```

  从好的编程习惯来说，我们应该要保持constructor属性的正确指向。

### toString方法

  利用toString方法基本上可以解决所有内置对象类型的判断：

```JavaScript
  function type (obj) {
    return Reflect.apply(Object.prototype.toString, obj, []).replace(/^\[object\s(\w+)\]$/, '$1').toLowerCase()
  }
  
  type(new String('123')) // string
```

  但是这种方法对于自定义的构造函数仍然无效。

### 内置Symbol接口

  ES6中通过Symbol暴露了一些内置的API：

```JavaScript
  Animal.prototype[Symbol.toStringTag] = 'Animal';
  type(rabbit) // animal
```

  现在，我们可以通过toString满足所有的需求了，但是也不乏有很皮的程序员：

```JavaScript
  const o = {
    get [Symbol.toStringTag] () {
      return 'Array'
    }
  }

  type(o) // array
```

  例外对于instanceof操作符也暴露了Symbol.hasInstance，这里就不再赘述了。

### 那些年的坑

  这里就举一个简单的例子：

```JavaScript
  function test (decimal) {
    if (type(decimal) === 'number') {
      return decimal.toFixed(2)
    } else if (type(decimal) === 'string') {
      return parseFloat(decimal).toFixed(2)
    } else {
      return '0.00'
    }
  }

  test(28.39843) // 28.40
  test('323.2321321') // 323.23
```

  用过toFixed()方法的人都知道它是Number.prototype上的方法，如果传入的并不是数字类型，那就会出现各种问题。

  当然我们处于一个前端工具蓬勃发展的时代，涌现了很多静态类型检查的工具：

- [Flow.js](https://github.com/facebook/flow) Facebook出品
- [TypeScript](https://github.com/Microsoft/TypeScript) Microsoft出品
