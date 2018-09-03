function Animal (name) {
  this.name = name
}

Animal.prototype.say = function () {
  console.log(this.name + ' hi')
}

function People (name, hobby) {
  Animal.call(this, name)
  this.hobby = hobby
}

People.prototype = Object.create(Animal.prototype)
People.prototype.constructor = People

const p1 = new People('xiaoming', 'lol')

p1.say()
console.log(p1.hobby)

const otherObj = {}

Object.defineProperty(otherObj, 'name', {
  value: 'xiaoming',
  enumberable: true,
  configurable: true,
  writable: true
})

Object.defineProperty(otherObj, 'age', {
  value: 20,
  writable: false
})

Object.defineProperty(otherObj, 'hobby', {
  set (value) {
    console.log(value)
  }
})

const obj = Object.create(otherObj)

// 第一种 一般情况
obj.name = 'xiaohong'
console.log(obj.name)

// 原型链上的属性为不可写
obj.age = 100
console.log(obj.age) // 20

// 原型链上该属性设置了setter
obj.hobby = 'Hahh'
console.log(obj.hobby)
