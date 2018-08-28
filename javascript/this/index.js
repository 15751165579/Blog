/* eslint-disable */
function sayHi () {
  console.log(`say hi ${this.name}`)
}

sayHi.call({ name: 'xaioming'})

sayHi.call({ name: 'xaiohong'})

// this并不指向自身
function foo () {
  this.count++
}

foo.count = 0

foo()
console.log(foo.count)
foo.call(foo)
console.log(foo.count)

// 更改this指向的集中方法 call apply bind new


// 实际上apply call的自定义都是通过调用栈确定this的方式实现
Function.prototype.applyAction = function (ctx, arr) {
  ctx = ctx || window
  ctx.fn = this
  let result
  if (!arr) {
     result = ctx.fn()
  } else {
    let args = []
    for (let i = 0, max = arr.length; i < max; i++) {
      args.push(`arr[${i}]`)
    }
    result = eval(`ctx.fn(${args})`)
  }
  delete ctx.fn
  return result
}

function bar (a) {
  console.log(a + '' + this.name)
}

bar.applyAction({ name: 'foo' }, ['you can do: '])

// new 
function createNew () {
  const obj = new Object()
  const args = Array.from(arguments)
  const C = args.shift()
  Object.setPrototypeOf(obj, C.prototype)
  const ret = Constructor.apply(obj, args)
  return typeof ret === 'object' ? ret : obj
}


// create 
function create (proto) {
  function F () {}
  F.prototype = proto
  return new F()
}

function Baz (name) {
  this.name = name
}

// bind的实现

Function.prototype.bindAction = function (oThis) {
  if (typeof this !== 'function') {
    throw new Error('error')
  }
  const aArgs = Array.from(arguments).slice(1)
  const fToBind = this
  const fNOP = function () {}
  const fBound = function () {
    return fToBind.apply(this instanceof fNOP ? this : oThis, aArgs.concat(Array.from(arguments)))
  }
  // 维护原型
  if (this.prototype) {
    fNOP.prototype = this.prototype
  }
  fBound.prototype = new fNOP()
  return fBound
}
console.log(Baz.prototype)



