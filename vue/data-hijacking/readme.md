# 深入浅出 Vue -- 数据劫持的实现原理

### 一、前言

  &emsp;&emsp;数据双向绑定作为 Vue 核心功能之一，其实现原理主要分为两部分：

  - 数据劫持
  - 发布订阅模式

  &emsp;&emsp;本篇主要介绍 Vue 中实现数据劫持的思路以及一些细节问题，下一篇则会介绍发布订阅模式的设计。

  &emsp;&emsp;首先，读者需要知道 Vue 中主要劫持两大数据类型：

  - Object 类型
  - Array 类型

### 二、Object 类型的劫持实现

  &emsp;&emsp;对于 Object 类型，主要就是劫持其属性的读取与设置操作。在 JavaScript 中对象的属性主要由一个字符串类型的“名称”以及一个“属性描述符”组成，属性描述符包括以下选项：

  - value 该属性的值；
  - writable 仅当值为 true 时表示该属性可以被改变；
  - get 访问器（getter）；
  - set 设置器（setter）；
  - configurable 仅当值为 true 时，该属性可以被删除以及属性描述符可以被改变；
  - enumerable 仅当值为 true 时，该属性可以被枚举。

  &emsp;&emsp;而上述 set 和 get 属性描述符选项就可以帮助开发者定义属性的读取与设置操作，而 JavaScript 中提供 Object.defineProperty() 方法来定义属性的描述符：

```JavaScript
function defineReactive (obj, key) {
  let val = obj[key]
  Object.defineProperty(obj, key, {
    get () {
      console.log(' === 收集依赖 === ')
      console.log(' 当前值为：' + val)
      return val
    },
    set (newValue) {
      console.log(' === 通知变更 === ')
      console.log(' 当前值为：' + newValue)
      val = newValue
    }
  })
}

const student = {
  name: 'xiaoming'
}

defineReactive(student, 'name') // 劫持 student 对象上的 name 属性

```

  &emsp;&emsp;上述代码通过 Object.defineProperty() 方法设置属性的 set 与 get 描述符，从而达到劫持“student”对象中的“name”属性的读取和设置操作，不过该方法也有一个比较繁琐的地方，就是需要遍历对象来为每一个属性设置 set 与 get 描述符：

```JavaScript
  Object.keys(student).forEach(key => defineReactive(student, key))
```

  &emsp;&emsp;这样导致一个问题，假如后续需要扩展该对象，那么就不能忘记为其扩展的属性再次设置 set 和 get 方法，**这就是为什么不在 data 中声明的属性无法自动拥有双向绑定效果的原因 **。（这时需要调用 Vue.set() 手动更新）

  &emsp;&emsp;相比较下，ES6 中 Proxy 则可以避免这样的问题。

  &emsp;&emsp;以上便是 Object 类型劫持的核心实现，但是还有以下细节问题需要注意：

##### 1、属性描述符 - configurable

  &emsp;&emsp;在 JavaScript 中，对象通过字面量创建时，其属性描述符默认如下：

```JavaScript
const foo = {
  name: '123'
}
Object.getOwnPropertyDescriptor(foo, 'name') // { value: '123', writable: true, enumerable: true, configurable: true }
```

  &emsp;&emsp;前面也提到了 configurable 的值如果为 false，则无法再修改该属性的描述符，所以在设置 set 和 get 时，需要注意 configurable 属性的取值：

```JavaScript
// 部分重复代码 这里就不再罗列了。
function defineReactive (obj, key) {
  // ...

  const desc = Object.getOwnPropertyDescriptor(obj, key)

  if (desc && desc.configurable === false) {
    return
  }

  // ...
}
```

  &emsp;&emsp;而在 JavaScript 中，导致 configurable 的值为 false 的情况还是很多的：

  - 可能该属性在此之前已经通过 Object.defineProperty() 方法设置了 configurable 的值；
  - 通过 Object.seal() 方法设置该对象为密封对象，只能修改该属性的值并且不能删除该属性以及修改其描述符；
  - 通过 Object.freeze() 方法冻结该对象，相比较 Object.seal() 方法，它更为严格之处体现在不允许修改属性的值。

##### 2、默认 getter 和 setter 方法

  &emsp;&emsp;另外开发者可能已经为对象的属性设置了 getter 和 setter 方法，对于这种情况，Vue 当然不能破坏开发者定义的方法，所以 Vue 中优先以默认的 getter 和 setter 方法为主：

```JavaScript
// 部分重复代码 这里就不再罗列了
function defineReactive (obj, key) {
  let val = obj[key]

  //....

  // 默认 getter setter
  const getter = desc && desc.get
  const setter = desc && desc.set

  Object.defineProperty(obj, key, {
    get () {
      const value = getter ? getter.call(obj) : val // 优先执行默认的 getter
      return value
    },
    set (newValue) {
      const value = getter ? getter.call(obj) : val
      // 如果值相同则没必要更新 === 的坑点 NaN!!!!
      if (newValue === value || (value !== value && newValue !== newValue)) {
        return
      }

      if (getter && !setter) {
        // 用户未设置 setter
        return
      }

      if (setter) {
        // 调用默认的 setter 方法
        setter.call(obj, newValue)
      } else {
        val = newValue
      }
    }
  })
}
```

##### 3、递归属性值

  &emsp;&emsp;最后一种比较重要的情况就是属性的值可能也是一个对象，那么在处理对象的属性时需要递归处理其属性值：

```JavaScript
function defineReactive (obj, key) {
  let val = obj[key]

  // ...

  // 递归处理其属性值
  const childObj = observe(val)

  // ...
}
```

  &emsp;&emsp;**递归循环引用对象很容易出现爆栈问题**，对于这种情况，Vue 通过定义 __ob__ 对象记录已经被设置过 get 和 set 描述符的对象，从而避免爆栈的问题。

```JavaScript
function isObject (val) {
  const type = val
  return val !== null && (type === 'object' || type === 'function')
}

function observe (value) {
  if (!isObject(value)) {
    return
  }

  let ob
  // 避免循环引用造成的递归爆栈问题
  if (value.hasOwnProperty('__ob__') && value.__obj__ instanceof Observer) {
    ob = value.__ob__
  } else if (Object.isExtensible(value)) {
    // 后续需要定义诸如 __ob__ 这样的属性，所以需要能够扩展
    ob = new Observer(value)
  }

  return ob
}
```

  &emsp;&emsp;上述代码中提到了对象的可扩展性，在 JavaScript 中所有对象默认都是可扩展的，但同时也提供了相应的方法让对象不可扩展：

```JavaScript
const obj = { name: 'xiaoming' }
Object.preventExtensions(obj)
obj.age = 20
console.log(obj.age) // undefined
```

  &emsp;&emsp;除了上述方法，还有前面提到的 Object.seal() 和 Object.freeze() 方法。


### 三、Array 类型的劫持实现

  &emsp;&emsp;数组是一种特殊的对象，其下标实际上就是对象中的属性，并且它还拥有“length”属性，这里需要注意的是“length”属性的特殊之处：

```JavaScript
const arr = [1, 2, 3]

Object.getOwnPropertyDescriptor(arr, 'length') // { value: 3, writable: true, enumerable: false, configurable: false }
```

  &emsp;&emsp;其 configurable 值决定了无法通过 Object.defineProperty() 方法劫持“length”属性的读取和设置方法，而 length 属性值的变化对于数组元素的影响是非常大的，前面也提到了对于新增属性需要手动处理，而这里无法劫持 length 则会导致由于 length 的变化带来的属性无法被劫持的问题。

  &emsp;&emsp;所有 Vue 并没有采用 Object.defineProperty() 方法对数组下标属性进行处理，如果通过数组下标的方式修改数组元素，开发者必须通过调用 Vue.set() 方法才能达到劫持的效果。

  &emsp;&emsp;但是数组元素的操作非常的灵活，为了优化开发者的使用体验， Vue 劫持了部分常用的数组方法。

```JavaScript
const methods = [
  'push',
  'pop',
  'shift',
  'unshift',
  'sort',
  'reverse',
  'splice'
]
```

  &emsp;&emsp;数组方法的劫持就涉及到了原型相关的知识，首先数组实例的大部分方法都是来源于 Array.prototype 对象。

  &emsp;&emsp;但是不能直接篡改 Array.prototype 对象，这样会影响所有的数组实例，为了避免这种情况，需要采用原型继承得到一个新的原型对象：

```JavaScript
const arrayProto = Array.prototype
const injackingPrototype = Object.create(arrayProto)
```

  &emsp;&emsp;拿到新的原型对象之后，需要重写这些常用的方法：

```JavaScript
methods.forEach(method => {
  const originArrayMethod = arrayProto[method]
  injackingPrototype[method] = function (...args) {
    const result = originArrayMethod.apply(this, args)
    let inserted
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args
        break
      case 'splice':
        inserted = args.slice(2)
        break
    }
    if (inserted) {
      // 对于新增的元素，继续劫持
      // ob.observeArray(inserted)
    }
    // 通知变化
    return result
  }
})
```

  &emsp;&emsp;最后，需要更新需要劫持的数组实例的原型，在 ES6 之前，可以通过浏览器私有属性 __proto__ 指定，ES6 之后可以通过：

```JavaScript
const arr = [1, 2, 3]
Object.setPrototypeOf(arr, injackingPrototype)
```

### 四、总结

  &emsp;&emsp;以上便是 Vue 实现数据劫持的核心原理，主要就是通过 Object.defineProperty() 方法劫持对象的属性，其缺点主要在于：

  - 一次只能设置一个属性，所以需要遍历对象或者数组；
  - 新增属性无法自动被探测；
  - 受属性描述符 configurable 的影响是致命的。

  &emsp;&emsp;而 ES6 中的 Proxy 可以完美的解决这些问题，这也是 Vue3.0 中的一个大动作，有兴趣的读者可以查阅相关的文章。

  &emsp;&emsp;如果本文对您有所帮助，那么点个关注鼓励一下笔者吧。