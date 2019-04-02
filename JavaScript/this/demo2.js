/**
 * 箭头函数的原理
 */

const obj = {
  name: '123',
  say () {
    let self = this
    return function saySomething () {
      console.log(self.name)
    }
  },
  say1 () {
    return function saySomething () {
      console.log(this.name)
    }
  },
  say2 () {
    const saySomething = () => console.log(this.name)
    return saySomething
  }
}

const say = obj.say()
const say1 = obj.say1()
const say2 = obj.say2()

say()
say1()
say2()
