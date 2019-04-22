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

const a1 = [1, 2, 3]

const p = new Proxy(a1, {
  get (target, key) {
    console.log('劫持')
    console.log(key)
    return target[key]
  }
})

console.log(p.length)

p.push(20)

