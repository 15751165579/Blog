# JavaScript 中的 this 

### 一、前言

  &emsp;&emsp;this是由函数调用的方式决定的。

### 二、默认绑定

  &emsp;&emsp;默认情况下this 指向 window ，但是严格模式下,this 指向 undefined。

### 三、作为方法调用

  &emsp;&emsp;作为对象的方法调用，那么该对象就是 this

### 四、采用 call、apply、bind处理

  &emsp;&emsp;显式的指定 this。

  &emsp;&emsp; call 和 apply 的模拟实现 可以借助 函数作为方法调用，再利用 eval 添加多个执行参数。

  &emsp;&emsp;bind 函数的实现:

```JavaScript
if (!Function.prototype.bind) {
  Function.prototype.bind = function (oThis) {
    if (typeof this !== 'function') {
      throw new Error('must be function')
    }

    const args = Array.prototype.slice.call(arguments, 1)
    const fToBind = this
    const FNOP = function() {}
    const fBind = function () {
      // 处理构造函数的情况
      return fToBind.apply(this instanceof fBind ? this : oThis, args.concat(Array.prototype.slice.call(arguments)))
    }

    // 维护原型关系
    if (this.prototype) {
      FNOP.prototype = this.prototype
    }
    fBind.prototype = new FNOP()
    return fBind
  }
}
```
