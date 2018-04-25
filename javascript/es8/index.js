/**
 * ES8
 * 6大特性
 * https://medium.freecodecamp.org/here-are-examples-of-everything-new-in-ecmascript-2016-2017-and-2018-d52fa3b5a70e
 */

// Object.values()

const cars = {
  BMW: 2,
  Tesla: 10,
  Toyota: 1
}

// es5
console.log(Object.keys(cars).map(key => cars[key]))

// now
console.log(Object.values(cars))

// Object.entries

// es5
Object.keys(cars).map(key => {
  console.log(key + ': ' + cars[key])
})

// now
for (let [key , value] of Object.entries(cars)) {
  console.log(`${key}: ${value}`)
}

const map1 = new Map()
Object.keys(cars).forEach(key => {
  map1.set(key, cars[key])
})
console.log(map1)

console.log(new Map(Object.entries(cars)))

// String Padding padStart and padEnd
console.log('1'.padStart(10))
console.log('111'.padStart(10))
console.log('233'.padStart(10, '0'))

// emoji
console.log('1'.padStart(10, '😭'))

// Object.getOwnPropertyDescriptors

const Car = {
  name: 'BMW',
  price: 1000000,
  set discount (x) {
    this.d = x
  },
  get discount () {
    return this.d
  }
}

console.log(Object.getOwnPropertyDescriptor(Car, 'discount'))

const ElectricCar = Object.assign({}, Car)
console.log(Object.getOwnPropertyDescriptor(ElectricCar, 'discount'))

const ElectricCar2 = Object.defineProperties({}, Object.getOwnPropertyDescriptors(Car))
console.log(Object.getOwnPropertyDescriptor(ElectricCar2, 'discount'))

// 对于函数参数尾部的逗号处理

// async await
// 它自己会将返回的值变为promise对象
// Promise.all 并行处理
// Handle Error

function doubleAfter (param) {
  return new Promise((resolve, reject) => {
    setTimeout(_ => {
      const val = param * 2
      isNaN(val) ? reject(NaN) : resolve(val)
    }, 1000)
  })
}

async function doubleAndAdd (a, b) {
  try {
    a = await doubleAfter(a)
    b = await doubleAfter(b)
  } catch (e) {
    return NaN
  }
  return a + b
}

async function doubleAndAdd2 (a, b) {
  a = await doubleAfter(a).catch(e => console.log('a is NaN'))
  b = await doubleAfter(b).catch(e => console.log('b is NaN'))
  if (!a || !b) {
    return NaN
  }
  return a + b
}

async function doubleAndAdd3 (a, b) {
  a = await doubleAfter(a)
  b = await doubleAfter(b)
  return a + b
}

doubleAndAdd(1, 2).then(console.log)
doubleAndAdd(1, 'a').then(console.log)

doubleAndAdd2(1, 'a').then(console.log)

doubleAndAdd3(1, 'a').then(console.log).catch(console.log)

