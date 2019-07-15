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

function Person(name) {
  this.name = name
}

Person.prototype.say = function () {
  console.log('say hello ' + this.name)
}

const p1 = new Person('xiaoming')
console.log(p1.name)
p1.say()

const p2 = _new(Person, 'xiaohong')
console.log(p2.name)
p2.say()