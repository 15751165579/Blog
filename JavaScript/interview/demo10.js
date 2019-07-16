const some = {
  name: 'xiaohong',
  age: 20
}

Object.defineProperty(some, Symbol.iterator, {
  value: function () {
    const self = this
    const keys = Object.keys(self)
    let index = 0
    return {
      next: function () {
        return {
          value: self[keys[index++]],
          done: index > keys.length
        }
      }
    }
  }
})

for (let item of some) {
  console.log(item)
}