# Prototype

### 原型继承

```JavaScript
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

People.prototype = Object.create(Animal.prototype) // 这里替换吗？
People.prototype.constructor = People

const p1 = new People('xiaoming', 'lol')

p1.say()
console.log(p1.hobby)
```

  - 为什么不能替换成People.prototype = Animal.prototype，这样修改直接引用了Animal的原型，修改会造成影响.
  - 为什么不能使用People.prototype = new Animal()，Animal构造函数中的逻辑会影响后代。
  - 实际这里你就明白为什么create的polyfill那么写

### = VS Object.defineProperty

  使用=的三种情况:

  - 如果原型链上该属性正常，那么使用=则产生一个屏蔽属性。
  - 如果原型链上该属性设置为不可写，那么你使用=是无效的。
  - 如果原型链上该属性设置了sette方法，同样你的=是无效的。

  相比较而言，Object.defineProperty应用场景更加广泛。