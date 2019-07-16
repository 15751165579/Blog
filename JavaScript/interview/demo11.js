Function.prototype.before = function (fn) {
  const self = this
  return function () {
    fn.apply(this, arguments)
    return self.apply(this, arguments) 
  }
}

Function.prototype.after = function (fn) {
  const self = this
  return function () {
    const ret = self.apply(this, arguments)
    fn.apply(this, arguments)
    return ret
  }
}

function foo() {
  console.log('foo')
}

foo.before(() => console.log('before')).after(() => console.log('after'))()