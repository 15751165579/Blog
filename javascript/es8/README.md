# 2018都过一半了，还没来得及看ES8？[![](https://badge.juejin.im/entry/5af56e1c6fb9a07aae153cc9/likes.svg?style=plastic)](https://juejin.im/post/5af564cff265da0b7c07552f)

> 过了一个五一长期之后，发现2018年都过去一半了，尴尬的计划却赶不上时光的变化。

## 一、函数参数允许尾后逗号

  对于这个特性的更改，我的感触还是很深的：每当删除或者添加函数末尾参数时，你不得不在前一个参数的后面删除或者添加逗号。这种操作很逆天。

  翻翻文档，其实早在ES5时代已经支持对象尾后逗号的书写，但是在JSON中是不允许尾后逗号的。

> Tip: JSON.stringify()会自动去掉对象的尾后逗号。

## 二、String的padStart和padEnd

```JavaScript
  '咦嘻嘻'.padStart(10, '-') // -------咦嘻嘻
  '咦嘻嘻'.padEnd(10, '-')   // 咦嘻嘻-------
```

> Tip: 当长度小于字符串本身长度则返回字符串本身

  看到这个方法，我们不难会想起在此之前会通过什么方法去解决此类的问题。

```JavaScript
  ('----------' + '咦嘻嘻').slice(-10) // -------咦嘻嘻
```

  在ES6之前我们可以通过slice加上固定的padString实现需求，显然缺点也很明显：padString的长度不够灵活。

```JavaScript
  ('-'.repeat(10) + '咦嘻嘻').slice(-10) // -------咦嘻嘻
```

  进入ES6之后，我们可以通过repeat结合slice实现，当然远没有padEnd来得方便。

  继表情包大战之后，聊天发表情，评论发表情几乎是随处可见。而我们在字符串的处理中就需要注意emoji表情：

```JavaScript
  const s = '😀'
  s.length // 2
```

  由此可见，采用emoji作为padString时可能出现截断情况。

```JavaScript
  console.log('咦嘻嘻'.padStart(10, s)) // 😀😀😀�咦嘻嘻
```

  虽然这是让人头疼的地方，但是emoji也有一些[趣事](https://twitter.com/wesbos/status/769229581509332992)

```JavaScript
  const s1 = '👨‍👩‍👦'
  [...s1] // [ '👨', '‍', '👩', '‍', '👦' ]
```

## 三、Object的values和entries

  这两个方法与ES5中的Object.keys()是类似的：

```JavaScript
  const fruits = {
    apple: 2,
    orange: 10
  }
  Object.keys(fruits) // [ 'apple', 'orange' ]
  Object.values(fruits) // [ 2, 10 ]
  Object.entries(fruits) // [ [ 'apple', 2 ], [ 'orange', 10 ] ]
```

  它们都是获取枚举属性并且不读取原型上的属性。

  其实到这里，大家也会想起另一种遍历对象的方法：

```JavaScript
  for (var key in fruits) {
    if (fruits.hasOwnProperty(key)) {
      console.log(key)
    }
  }
```
  没有对比就没有伤害，for-in就会读取原型上的属性，为了不出现意想不到的错误，通常我们会使用hasOwnProperty来过滤原型上的属性。

  总结上面这四种遍历对象的方法，它们一个共同点就是只获取枚举属性，那么问题来了，如果想获取非枚举属性怎么办呢？

```JavaScript
  Object.defineProperty(fruits, 'peach', {
    value: 18,
    enumerable: false
  })

  Object.getOwnPropertyNames(fruits).filter(item => !fruits.propertyIsEnumerable(item)) // [ 'peach' ]
```

  这里细心的同学可能还会发现一个问题：在ES6中为了解决字符串作为属性名带来的唯一性问题，可以采用Symbol作为属性名使用，那么Symbol属性名能书获取到吗？

```JavaScript
  Object.defineProperty(fruits, Symbol('banana'), {
    value: 20
  })
  Object.getOwnPropertySymbols(fruits) // [ Symbol(banana) ]
```

  这里，突然想起了香锅的骚话，当然我们要的是枚举属性、非枚举属性以及Symbol属性：

```JavaScript
  Reflect.ownKeys(fruits) // [ 'apple', 'orange', 'peach', Symbol(banana) ]
```

## 四、Object上的另一个方法 getOwnPropertyDescriptors

  对于这个方法，大家应该不太陌生，因为在ES5中我们定义对象时会采用：

```JavaScript
  const obj = {}

  Object.defineProperty(obj, 'name', {
    value: 'xiaoyun',
    enumerable: true,
    writable: true,
    configurable: true
  })
```

  并且会使用getOwnPropertyDescriptor获取它的描述器属性：

```JavaScript
  Object.getOwnPropertyDescriptor(obj, 'name')
```

> Tip: 采用对象字面声明的属性的描述器属性默认为true，采用defineProperty声明的属性的描述器属性的默认值为false

  所以看到这个方法名，自然就知道它是干什么的：

```JavaScript
  Object.getOwnPropertyDescriptors(obj)
```

  当然，它的出现不仅仅是因为这个问题。在ES6中新增的拷贝方法assign，它并不能处理描述器属性，所以涉及到描述器属性的对象，不能通过assign来拷贝，所以有了getOwnPropertyDescriptors方法之后，我们可以这样处理设置描述器属性的对象：

```JavaScript
  Object.defineProperties({}, Object.getOwnPropertyDescriptors(obj))
```

## 五、async/await

  对于这个新特性的出现，真是的是让人眼前一亮。

> Tip:实际上async很早就被讨论了，以至于很多人认为它是ES6或者ES7标准，实际上它在2017才被正式列入标准，应该属于ES8标准。

  对于async/await，你必须要知道:

- async是用来声明一个异步函数，并且它默认返回一个Promise对象；
- await操作符必须在async中使用；
- await操作符后面一定是Promise对象，如果是普通对象，它会默认用Promise.resolve()包裹。

```JavaScript
  function fetchNumber () {
    return new Promise((resolve, reject) => {
      setTimeout(_ => {
        const num = Number.parseInt(Math.random() * 10)
        if (num >= 5) {
          resolve(num)
        } else {
          reject(new Error(`${num} is smaller than 5`))
        }
      }, 1000)
    })
  }

  async function task () {
    try {
      const num = await fetchNumber()
      return num
    } catch (e) {
      return Promise.reject(e.message)
    }
  }

  task().then(console.log).catch(console.log)
```

  在使用async时，千万不要因为它同步的写法而陷入误区，具体我们需要分析我们的异步，例如：我们调用多个fetchNumber时，它们之间并没有依赖关系，那么我们应该这样写：

```JavaScript
  const [num1, num2] = await Promise.all([fetchNumber(), fetchNumber()])
```

  当然如果这两个方法有相互依赖的关系，那么就需要：

```JavaScript
  const num1 = await fetchNumber()
  const num2 = await fetchNumber()
```

  对于async的异常处理，基本上还是采用try/catch的方式，当然也有对try/catch诟病的[传送门](https://blog.grossman.io/how-to-write-async-await-without-try-catch-blocks-in-javascript/)。


# 参考文章

- [Here are examples of everything new in ECMAScript 2016, 2017, and 2018](https://medium.freecodecamp.org/here-are-examples-of-everything-new-in-ecmascript-2016-2017-and-2018-d52fa3b5a70e)
- [异步函数 - 提高 Promise 的易用性](https://developers.google.com/web/fundamentals/primers/async-functions)


