# JavaScript中不得不说的断言?

[![](https://badge.juejin.im/entry/5b1684676fb9a01e6c0b391d/likes.svg?style=plastic)](https://juejin.im/post/5b1683bee51d4506d73f176b)

> 断言主要应用于“调试”与“测试”

### 一、前端中的断言

  仔细地查找一下JavaScript中的API，实际上并没有多少关于断言的方法。唯一一个就是console.assert：

```JavaScript
  // console.assert(condition, message)
  const a = '1'
  console.assert(typeof a === 'number', 'a should be Number')
```
  当condition为false时，该方法则会将错误消息写入控制台。如果为true，则无任何反应。
  
  实际上，很少使用console.assert方法，如果你阅读过vue或者vuex等开源项目，会发现他们都定制了断言方法：

```JavaScript
  // Vuex源码中的工具函数
  function assert (condition, msg) {
    if (!condition) {
      throw new Error(`[Vuex] ${msg}`)
    }
  }
```

### 二、Node中的断言

  Node中内置断言库(assert)，这里我们可以看一个简单的例子：

```JavaScript
  try {
    assert(false, '这个值应该是true')
  } catch(e) {
    console.log(e instanceof assert.AssertionError) // true
    const { actual, expected, operator } = e
    console.log(`实际值： ${actual}，期望值： ${expected}, 使用的运算符：${operator}`)
    // 实际值： false，期望值： true, 使用的运算符：==
  }
```

  assert模块提供了不少的方法，例如strictEqual、deepStrictEqual、notDeepStrictEqual等，仔细观察这几个方法，我们又得来回顾一下JavaScript中的相等比较算法：

  - 抽象相等比较算法 (==)
  - 严格相等比较算法 (===)
  - SameValue (Object.is())
  - SameValueZero

  几个方法的区别可以查看[这可能是你学习ES7遗漏的知识点](https://github.com/15751165579/Blog/issues/2)。

  在Node10.2.0文档中你会发现像assert.equal、assert.deepEqual这样的api已经被废除，也正是避免==的复杂性带来的易错性。而保留下来的api基本上多是采用后几种算法，例如：

  - strictEqual使用了严格比较算法
  - deepStrictEqual在比较原始值时采用SameValue算法

### 三、chai.js

  从上面的例子可以发现，JavaScript中内置的断言方法并不是特别的全面，所以这里我们可以选择一些三方库来满足我们的需求。

  这里我们可以选择chai.js，它支持两种风格的断言（TDD和BDD）：

```JavaScript
  const chai = require('chai')
  const assert = chai.assert
  const should = chai.should()
  const expect = chai.expect

  const foo = 'foo'

  // TDD风格 assert
  assert.typeOf(foo, 'string')

  // BDD风格 should
  foo.should.be.a('string')

  // BDD风格 expect
  expect(foo).to.be.a('string')
```

  大部分人多会选择expect断言库，的确用起来感觉不错。具体可以查看[官方文档](http://www.chaijs.com/)，毕竟确认过眼神，才能选择适合的库。

### 四、expect.js源码分析

  expect.js不仅提供了丰富的调用方法，更重要的就是它提供了类似自然语言的链式调用。

#### 链式调用

  谈到链式调用，我们一般会采用在需要链式调用的函数中返回this的方法实现：

```JavaScript
  class Person {
    constructor (name, age) {
      this.name = name
      this.age = age
    }
    updateName (val) {
      this.name = val
      return this
    }
    updateAge (val) {
      this.age = val
      return this
    }
    sayHi () {
      console.log(`my name is ${this.name}, ${this.age} years old`)
    }
  }

  const p = new Person({ name: 'xiaoyun', age: 10 })

  p.updateAge(12).updateName('xiao ming').sayHi()
```

  然而在expect.js中并不仅仅采用这样的方式实现链式调用，首先我们要知道expect实际上是Assertion的实例:

```JavaScript
  function expect (obj) {
    return new Assertion(obj)
  }
```

  接下来看核心的Assertion构造函数:

```JavaScript
  function Assertion (obj, flag, parent) {
    this.obj = obj;
    this.flags = {};

    // 通过flags记录链式调用用到的那些标记符，
    // 主要用于一些限定条件的判断，比如not，最终返回结果时会通过查询flags中的not是否为true,来决定最终返回结果
    if (undefined != parent) {
      this.flags[flag] = true;

      for (var i in parent.flags) {
        if (parent.flags.hasOwnProperty(i)) {
          this.flags[i] = true;
        }
      }
    }

    // 递归注册Assertion实例，所以expect是一个嵌套对象
    var $flags = flag ? flags[flag] : keys(flags)
      , self = this;
    if ($flags) {
      for (var i = 0, l = $flags.length; i < l; i++) {
        // 避免进入死循环
        if (this.flags[$flags[i]]) {
          continue
        }

        var name = $flags[i]
          , assertion = new Assertion(this.obj, name, this)
        
        // 这里要明白修饰符中有一部分也是Assertion原型上的方法，例如 an, be。
        if ('function' == typeof Assertion.prototype[name]) {
          // 克隆原型上的方法
          var old = this[name];
          this[name] = function () {
            return old.apply(self, arguments);
          };

          // 因为当前是个函数对象，你要是在后面链式调用了Assertion原型上方法是找不到的。
          // 所以要将Assertion原型链上的所有的方法设置到当前的对象上
          for (var fn in Assertion.prototype) {
            if (Assertion.prototype.hasOwnProperty(fn) && fn != name) {
              this[name][fn] = bind(assertion[fn], assertion);
            }
          }
        } else {
          this[name] = assertion;
        }
      }
    }
  }
```

  为什么要这样设计？我的理解是：首先expect.js的链式调用充分的体现了调用的逻辑性，而这种嵌套的结构真正的体现了各个修饰符之间的逻辑性。

  所以我们可以这样书写：

```JavaScript
  const student = {
    name: 'xiaoming',
    age: 20
  }

  expect(student).to.be.a('object')
```

  当然这并没有完，对于每一个Assertion原型上的方法多会直接或者间接的调用assert方法：

```JavaScript
  Assertion.prototype.assert = function (truth, msg, error, expected) {
    // 这就是flags属性的作用之一
    var msg = this.flags.not ? error : msg
      , ok = this.flags.not ? !truth : truth
      , err;

    if (!ok) {
      // 抛出错误
      err = new Error(msg.call(this));
      if (arguments.length > 3) {
        err.actual = this.obj;
        err.expected = expected;
        err.showDiff = true;
      }
      throw err;
    }

    // 为什么这里要再创建一个Assertion实例？也正是由于expect实例是一个嵌套对象。
    this.and = new Assertion(this.obj);
  };
```

  并且每一个Assertion原型上的方法最终通过返回this来实现链式调用。所以我们还可以这样写：

```JavaScript
  expect(student).to.be.a('object').and.to.have.property('name')
```

  到此你应该已经理解了expect.js的链式调用的原理，总结起来就是两点：

  - 原型方法还是通过返回this，实现链式调用；
  - 通过嵌套结构的实例对象增强链式调用的逻辑性；

  所以我们完全可以这样写：

```JavaScript
  // 强烈不推荐 不然怎么能属于BDD风格呢？
  expect(student).a('object').property('name')
```