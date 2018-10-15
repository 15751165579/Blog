#!/usr/bin/env node
/**
 * 参数解析
 * 子命令
 * 自动化化帮助信息
 * 
 * command 命令
 * alias 缩写
 * description 描述
 * option
 */
const program = require('commander')

program.version('0.0.1')
.description('a custom cli')

program.command('say <name>')
.description('introduce yourself')
.option('-a, --age [age]', 'your age', '20')
.action((name, options) => {
  console.log(name + ' ' + options.age)
})

program.on('--help', () => {
  console.log('自定义帮助信息')
})

program.parse(process.argv)
