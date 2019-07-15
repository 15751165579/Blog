# JavaScript 中 create 方法的实现

```JavaScript
function create(proto) {
  function F() {}
  F.prototype = proto
  return new F()
}
```