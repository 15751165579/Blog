// 数组为什么不能采用 Object.defineProperty

const arr = [1, 2, 3]

console.log(Object.getOwnPropertyDescriptor(arr, 'length'))

const s = Object.create(Array.prototype)

console.log(s)

console.log(s.push)


const demo = {}

Object.defineProperty(demo, 'age', {
  value: 10
})
// Object.defineProperty(demo, 'age', {
//   get () {
//     return 20
//   }
// })

const p = new Proxy(demo, {
  get (target, key) {
    console.log('劫持')
    return target[key]
  }
})

console.log(p.age)

