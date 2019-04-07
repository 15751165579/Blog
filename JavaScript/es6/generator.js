function bar () {
  return 1
}

function* some () {
  yield bar()
  yield 2
  yield 3
  return undefined
}

const s = some() // 第一步生成迭代器对象
console.log(s.next())
console.log(s.next())
console.log(s.next())
console.log(s.next())

// for of 可以自动运行 generator 生成的 iterator 对象， 不需要调用 next

const obj = {}
obj[Symbol.iterator] = function * _iterator () {
  yield 1
  yield 2
  yield 3
}

for (let value of obj) {
  console.log(value)
}

// generator 内部调用 genertator 需要采用 yield*
// next  可以携带一个参数 作为上一个yield的返回值

// 调用 throw 方法 内部可以通过 try catch 捕获错误

// return 返回给定值 并且终结 generator 对象 提前结束