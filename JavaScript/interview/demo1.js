const s = []

console.log(s instanceof Array)
console.log(s instanceof Object)

function Person(message) {
  if (this instanceof Person) {
    console.log('采用 new 的创建方式: ' + message)
  }
}

Person('haha')
new Person('yixixi')

function type(obj) {
  const proto = Object.prototype.toString
  return proto.call(obj).replace(/\[object\s(\w+)\]$/, '$1')
}

console.log(type([]))