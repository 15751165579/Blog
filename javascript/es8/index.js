/**
 * ES8
 * 6大特性
 * https://medium.freecodecamp.org/here-are-examples-of-everything-new-in-ecmascript-2016-2017-and-2018-d52fa3b5a70e
 */
// 1、函数参数允许尾后逗号

const o = {
  name: '小云',
  age: 2,
}

console.log(JSON.stringify(o))

// 其实对于这个特性的更改，真的是非常非常有感触。在此之前，当你删除或者添加末尾属性时，你不得不在前面删除或添加一个逗号。
console.log([1, 2, 3, , ,])

function some (a, b,) {}
// 2、String中的padStart和 padEnd
console.log('咦嘻嘻'.padStart(10, '-'))
console.log('咦嘻嘻'.padEnd(10, '-'))

console.log(('----------' + '咦嘻嘻').slice(-10))
console.log(('-'.repeat(Math.ceil(10)) + '咦嘻嘻').slice(-10)) // es6

// 当设置的长度小于字符串的长度时返回字符串自身
// emoji  https://twitter.com/wesbos/status/769229581509332992
const s = '😀'
console.log(s.length)

console.log('咦嘻嘻'.padStart(10, s))
let result = ''
for (let i = 0, max = s.length; i < max; i++) {
  result += `\\u${s.charCodeAt(i).toString(16)}`
}
console.log(result)

// 当然还有一些关于emoji好玩的事情

const s1 = '👨‍👩‍👦'
for (let i = 0, max = s1.length; i < max; i++) {
  result += `\\u${s1.charCodeAt(i).toString(16)}`
}
console.log(result)
console.log([...s1])



// 3、values entries (es5 keys)

const fruits = {
  apple: 2,
  orange: 10
}
console.log(Object.keys(fruits))
console.log(Object.values(fruits))
console.log(Object.entries(fruits))

Object.defineProperty(fruits, Symbol('banana'), {
  value: 20
})

Object.defineProperty(fruits, 'peach', {
  value: 18,
  enumerable: false
})

// 遍历对象的 方法 for in 坏处  原型链上的属性 使用 hasOwnProperty

for (let key in fruits) {
  if (fruits.hasOwnProperty(key)) {
    console.log(key)
  }
}

// 需要注意的点：

// 1、非枚举对象是遍历不到的，那如何获取到非枚举对象呢？

console.log(Object.getOwnPropertyNames(fruits).filter(item => !fruits.propertyIsEnumerable(item)))

// 2、es6中为了解决字符串作为属性名导致重复的问题，允许Symbol可以作为属性名使用，而这里的遍历方法多无法获取到Symbol类型的属性名

console.log(Object.getOwnPropertySymbols(fruits))

// emmmm...

console.log(Reflect.ownKeys(fruits))

// 4、getOwnPropertyDescriptors  (es6 assign) （es5 defineProperty） (es5 getOwnPropertyDescriptor)

// 又是一个对象上的新方法
// 回顾一下之前的知识点,当我们定义一个对象的属性时完整的操作

const obj = {}

Object.defineProperty(obj, 'name', {
  value: 'xiaoyun',
  enumerable: true,
  writable: true,
  configurable: true
})

Object.defineProperty(obj, 'age', {
  get () {
    return this.a
  },
  set (x) {
    this.a = x
  },
  enumerable: true
})

console.log(Object.getOwnPropertyDescriptor(obj, 'name'))
console.log(Object.getOwnPropertyDescriptors(obj))

// 那么这个方法到底有什么好处呢，那么我们需要来看看Object.assign

const obj1 = Object.assign({}, obj)

console.log(Object.getOwnPropertyDescriptor(obj1, 'age'))

// assign并不处理除value之外的描述符属性, 这种情况下我们只能采用 defineProperties 和 getOwnPropertyDescriptor

const obj2 = Object.defineProperties({}, Object.getOwnPropertyDescriptors(obj))

function Some (name = '', age = 0) {
  Object.assign(this, {
    name,
    age
  })
}
const som = new Some('哈哈哈', 20)
console.log(`${som.name} ${som.age}`)


// 5、async await 主要在于错误处理

// 好处一张图 很清晰

// async 的异常处理 个人还是觉得使用try catch 比较好一点。

function fetchNumber () {
  return new Promise((resolve, reject) => {
    setTimeout(_ => {
      const num = Number.parseInt(Math.random() * 10)
      if (num >= 5) {
        resolve(num)
      } else {
        reject(new Error(`${num} is smaller than 5`))
      }
    }, 1000)
  })
}

// async function task () {
//   try {
//     const num = await fetchNumber()
//     return num
//   } catch (e) {
//     return Promise.reject(e.message)
//   }
// }

async function task () {
  try {
    const [num1, num2] = await Promise.all([fetchNumber(), fetchNumber()])
    return [num1, num2]
  } catch (e) {
    return Promise.reject(e.message)
  }
}

task().then(console.log).catch(console.log)