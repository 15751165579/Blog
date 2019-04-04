// indexOf

// ES6 扩展了 includes startsWith endsWith
let demo1 = 'hello world'

console.log(demo1.includes('o'))
console.log(demo1.startsWith('h'))
console.log(demo1.endsWith('d'))

// repeat
let demo2 = '123'
console.log(demo2.repeat(3))

// padStart padEnd

const hours = 8

console.log(String(hours).padStart(2,'0'))

// 模板字符串 ``