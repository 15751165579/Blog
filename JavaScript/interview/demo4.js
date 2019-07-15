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