# 深入浅出 Vue 系列 -- 数据劫持实现原理

### 一、前言

  &emsp;&emsp;数据双向绑定作为 Vue 核心功能之一，其实现原理主要分为两部分：

  - 数据劫持
  - 发布订阅模式

  &emsp;&emsp;本篇文章主要介绍 Vue 实现数据劫持的思路，下一篇则会介绍发布订阅模式的设计。

### 二、针对 Object 类型的劫持

  &emsp;&emsp;对于 Object 类型，主要劫持其属性的读取与设置操作。在 JavaScript 中对象的属性主要由一个字符串类型的“名称”以及一个“属性描述符”组成，属性描述符包括以下选项：

  - value： 该属性的值；
  - writable： 仅当值为 true 时表示该属性可以被改变；
  - get： getter （读取器）；
  - set： setter （设置器）；
  - configurable： 仅当值为 true 时，该属性可以被删除以及属性描述符可以被改变；
  - enumerable： 仅当值为 true 时，该属性可以被枚举。

  &emsp;&emsp;上述 setter 和 getter 方法就是供开发者自定义属性的读取与设置操作，而设置对象属性的描述符则少不了 Object.defineProperty() 方法：

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

defineReactive(student, 'name') // 劫持 name 属性的读取和设置操作

```

  &emsp;&emsp;上述代码通过 Object.defineProperty() 方法设置属性的 setter 与 getter 方法，从而达到劫持 student 对象中的 name 属性的读取和设置操作的目的。

  &emsp;&emsp;读者可以发现，**该方法每次只能设置一个属性**，那么就需要遍历对象来完成其属性的配置：

```JavaScript
  Object.keys(student).forEach(key => defineReactive(student, key))
```

  &emsp;&emsp;另外还必须是一个**具体的属性**，这也非常的致命。

  &emsp;&emsp;假如后续需要扩展该对象，那么就必须手动为新属性设置 setter 和 getter 方法，**这就是为什么不在 data 中声明的属性无法自动拥有双向绑定效果的原因 **。（这时需要调用 Vue.set() 手动设置）

  &emsp;&emsp;以上便是对象劫持的核心实现，但是还有以下重要的细节需要注意：

##### 1、属性描述符 - configurable

  &emsp;&emsp;在 JavaScript 中，对象通过字面量创建时，其属性描述符默认如下：

```JavaScript
const foo = {
  name: '123'
}
Object.getOwnPropertyDescriptor(foo, 'name') // { value: '123', writable: true, enumerable: true, configurable: true }
```

  &emsp;&emsp;前面也提到了 configurable 的值如果为 false，则无法再修改该属性的描述符，所以在设置 setter 和 getter 方法时，需要注意 configurable 选项的取值，否则在使用 Object.defineProperty() 方法时会抛出异常：

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

  &emsp;&emsp;而在 JavaScript 中，导致 configurable 值为 false 的情况还是很多的：

  - 可能该属性在此之前已经通过 Object.defineProperty() 方法设置了 configurable 的值；
  - 通过 Object.seal() 方法设置该对象为密封对象，只能修改该属性的值并且不能删除该属性以及修改属性的描述符；
  - 通过 Object.freeze() 方法冻结该对象，相比较 Object.seal() 方法，它更为严格之处体现在不允许修改属性的值。

##### 2、默认 getter 和 setter 方法

  &emsp;&emsp;另外，开发者可能已经为对象的属性设置了 getter 和 setter 方法，对于这种情况，Vue 当然不能破坏开发者定义的方法，所以 Vue 中还要保护默认的 getter 和 setter 方法：

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

  &emsp;&emsp;最后一种比较重要的情况就是属性的值可能也是一个对象，那么在处理对象的属性时，需要递归处理其属性值：

```JavaScript
function defineReactive (obj, key) {
  let val = obj[key]

  // ...

  // 递归处理其属性值
  const childObj = observe(val)

  // ...
}
```

  &emsp;&emsp;**递归循环引用对象很容易出现递归爆栈问题**，对于这种情况，Vue 通过定义 __ob__ 对象记录已经被设置过 getter 和 setter 方法的对象，从而避免递归爆栈的问题。

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

  &emsp;&emsp;上述代码中提到了对象的可扩展性，在 JavaScript 中所有对象默认都是可扩展的，但同时也提供了相应的方法允许对象不可扩展：

```JavaScript
const obj = { name: 'xiaoming' }
Object.preventExtensions(obj)
obj.age = 20
console.log(obj.age) // undefined
```

  &emsp;&emsp;除了上述方法，还有前面提到的 Object.seal() 和 Object.freeze() 方法。


### 三、针对 Array 类型的劫持

  &emsp;&emsp;数组是一种特殊的对象，**其下标实际上就是对象的属性，所以理论上是可以采用 Object.defineProperty() 方法处理数组对象**。

  &emsp;&emsp;但是 Vue 并没有采用上述方法劫持数组对象，笔者猜测主要由于以下两点：（读者有更好的见解，欢迎留言。）

##### 1、特殊的 length 属性

  &emsp;&emsp;数组对象的 length 属性的描述符天生独特：

```JavaScript
const arr = [1, 2, 3]

Object.getOwnPropertyDescriptor(arr, 'length').configurable // false
```

  &emsp;&emsp;这就意味着无法通过 Object.defineProperty() 方法劫持 length 属性的读取和设置方法。

  &emsp;&emsp;相比较对象的属性，数组下标变化地相对频繁，并且改变数组长度的方法也比较灵活，一旦数组的长度发生变化，那么在无法自动感知的情况下，开发者只能手动更新新增的数组下标，这可是一个很繁琐的工作。

##### 2、数组的操作场景

  &emsp;&emsp;数组主要的操作场景还是遍历，而对于每一个元素都挂载一个 get 和 set 方法，恐怕也是不小的性能负担。

##### 3、数组方法的劫持

  &emsp;&emsp;最终 Vue 选择劫持一些常用的数组操作方法，从而知晓数组的变化情况：

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

  &emsp;&emsp;数组方法的劫持涉及到原型相关的知识，首先数组实例大部分方法都是来源于 Array.prototype 对象。

  &emsp;&emsp;但是这里不能直接篡改 Array.prototype 对象，这样会影响所有的数组实例，为了避免这种情况，需要采用原型继承得到一个新的原型对象：

```JavaScript
const arrayProto = Array.prototype
const injackingPrototype = Object.create(arrayProto)
```

  &emsp;&emsp;拿到新的原型对象之后，再重写这些常用的操作方法：

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

  &emsp;&emsp;最后，更新劫持数组实例的原型，在 ES6 之前，可以通过浏览器私有属性 __proto__ 指定，ES6 之后可以通过：

```JavaScript
Object.setPrototypeOf(arr, injackingPrototype)
```

### 四、总结

  &emsp;&emsp;由于 Object.defineProperty() 方法存在的一些缺陷，Vue 中的数据劫持分成两部分：

  - 针对 Object 类型，采用 Object.defineProperty() 方法劫持属性的读取和设置方法；
  - 针对 Array 类型，采用原型相关的知识劫持常用的函数，从而知晓当前数组发生变化。
  
  &emsp;&emsp;并且 Object.defineProperty() 方法存在一些缺陷：

  - 每次只能设置一个具体的属性，导致需要遍历对象来设置属性，同时也导致了无法探测新增属性；
  - 属性描述符 configurable 对其的影响是致命的。

  &emsp;&emsp;而 ES6 中的 Proxy 可以完美的解决这些问题（目前兼容性是个大问题），这也是 Vue3.0 中的一个大动作，有兴趣的读者可以查阅相关的文章。

  &emsp;&emsp;如果本文对您有所帮助，那么点个关注鼓励一下笔者吧。