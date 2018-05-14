// 关于Node process对象的小知识点
const program = require('commander')
const chalk = require('chalk')
const inquirer = require('inquirer')

// 1、env

process.env.NODE_ENV = 'development'
if (process.env.NODE_ENV === 'development') {
  console.log('当前是开发环境')
}

// 2、argv

console.log(process.argv)

// 第一个参数为node执行路径， 第二个参数为JS文件的路径 ，后续为命令行中传入的参数

console.log(process.execPath)

// 1、commander.js
// commander.js是TJ大神的作品，它让命令行的操作更加简洁，参考Ruby。
program.option('-a, --age <age>', '年龄')
.option('-I, --is-man [isMan]', '是男生吗？', false)
.parse(process.argv)

console.log(`${program.isMan ? '他' : '她'}今年${program.age}岁`)

// console.log(chalk.rgb(123,2,123).underline(program.age))
// console.log(chalk.hex('#ea23fa').bold(program.man))
// console.log(chalk.keyword('orange')('done'))

// 3、stdin stdout （ console是调用具有格式化stdout ）

// process.stdin.setEncoding('utf8')

// process.stdin.on('readable', () => {
//   const chunk = process.stdin.read()
//   if (chunk !== null) {
//     if (chunk.slice(0, chunk.length - 1) === 'end') {
//       process.stdin.emit('end')
//     } else {
//       process.stdout.write(`您输入的是: ${chunk}`)
//     }
//   }
// });

// process.stdin.on('end', () => {
//   process.stdout.write('end')
// })

// const questions = [
//   {
//     type: 'input',
//     name: 'name',
//     message: '请输入您的姓名：'
//   }
// ]

// inquirer.prompt(questions).then(res => {
//   console.log(res.name)
//   // console.log(chalk.rgb(23,123,222).bold(res.name))
// })

console.log(chalk.rgb(123,2,123).underline('chalk is nice'))
console.log(chalk.hex('#8928eb').bold('chalk is nice'))
console.log(chalk.keyword('orange')('chalk is nice'))

// 4、退出process

setInterval(_ => {
  console.log('定时器')
  // process.exit(0)
  // process.kill(process.pid)
  process.abort()
}, 1000)

// process.on('beforeExit', code => {
//   console.log(`beforeExit: ${code}`)
// })

process.on('exit', code => { 
  // 只允许同步操作
  console.log(`exit: ${code}`)
})

// process.exit(0)

// 1、没有额外工作添加到事件循环数组中，Node会自动结束进程
// 2、ctrl + c
// 3、process.exit()
// 4、process.kill()
// 5、process.abort()
