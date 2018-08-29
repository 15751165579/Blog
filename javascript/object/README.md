# 对象

### 基本类型

  - null (typeof null === 'object')
  - undefined
  - string
  - number
  - boolean
  - symbol (ES6)

### 字面量

  很长时间没有理解的一点:

```JavaScript
  const str = 'hello'
  str.length // 这里实际上隐式的将字符串字面量转换为字符串对象
```

### 属性的访问方式

  - 属性访问 .
  - 键值访问 []

  两者各有利弊吧，相对于属性访问，键值访问更加的全面。

### 深拷贝VS浅拷贝

  其实上JS本身都是浅拷贝。例如赋值操作，Object.assign。

  而如果真正要上深拷贝，考虑的情况还是比较复杂的，比较讨巧的方法：对于符合JSON安全的，可以采用。

```JavaScript
  JSON.parse(JSON.stringify(some))
```

### 属性描述符

  - writable
  - configurable
  - enumberable

  writable不允许对象的属性被重写。

  configurable不允许对象的属性被删除，但是再次定义的时候将configurable设置为false是可以重新定义的（不知道这算不算是一个bug）

  enumberable主要作用于对象属性的枚举，影响的方法有点都

  - 遍历的方法
  - 获取对象属性的方法

  对象支持禁止添加新的属性

```JavaScript
  Object.preventExtensions(obj) 
```

  如果你不仅仅需要禁止扩展，还不允许删除之前对象上的属性，那么：

```JavaScript
  Object.seal(obj)
```

  这样可能你还觉得不爽，那么你可以使用freeze，不允许修改之前对象的属性

```JavaScript
  Object.freeze(obj)
```

### Get vs Set

  这两个方法太重要了，以至于不知道从何说起

### 存在性

```JavaScript
  ('a' in obj) // 会判断原型上的属性
  obj.hasOwnProperty('a') // 只判断对象上拥有的属性
```

### 遍历的方法

```JavaScript
  for (var key in obj) {} // ES5对象的方法

  // 但是数组总是通过遍历下下标的方式处理
  for (var i = 0; i < 20; i++) {}

  // ES6推出了for of 也就是迭代器的出现。
```