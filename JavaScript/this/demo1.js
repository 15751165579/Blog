/**
 * 作为方法调用 常见 this 丢失情况
 */

// 函数别名
const obj = {
  name: '123',
  say () {
    console.log(this.name)
  }
}

const say = obj.say
say() // undefined

// 回调

function bar (fn) {
  fn && fn()
}

bar(obj.say) // undefined