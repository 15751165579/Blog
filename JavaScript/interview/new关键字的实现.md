###  JavaScript 中 new 关键字的实现

```JavaScript
function _new(constructor, ...rest) {
  // 创建一个新的对象
  const o = Object.create(null)
  // 指定原型
  Object.setPrototypeOf(o, constructor.prototype)
  // 指定 this
  const ret = constructor.apply(o, rest)
  // 返回新对象
  return (ret && typeof ret === 'object') ? ret : o
}
```