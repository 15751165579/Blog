const debug = require('debug')('demo')
const util = require('util')
debug.enabled = true
debug('some message')

console.log(util.inspect({name: 123, arr: ['123', '456']}, {
  showHidden: true,
  depth: null,
  colors: true
}))

console.log(util.inspect.styles)
console.log(util.inspect.colors)

console.log('\u001b[38;5;227;1m 不一样的 \u001b[0m \u001b[38;41;37;1m 烟火 \u001b[0m') // 1m 高亮 0m 清除所有的属性

// 如果你真的要使用可以采用三方 chalk or colors

// 浏览器下控制台的彩色输出
// console.log('%c 不一样的 %c 烟火', 'color: yellow;font-size: 20px;', 'color: red;font-size: 24px;')

// 文章的结构
// 题目： NodeJS中的日志处理

// 一、
// 什么是日志，主要用来记录用户操作和系统运行状态
// 一个优秀的日志突出体现就是帮助我们快速定位线上问题。

// 二、
// 在程序的开发环境下，我们通过都会采用打印一些调试信息，而你在许多node框架中都会选择TJ出品的debgu.js,而debug.js则是很好的选择

// debug的基本使用(命名空间)

// 原理，本质是还是调用我们的console, 解释node端 和 浏览器端 彩色输出的实现

// 三、
// 在express中我们可以采用morgan轻松的记录请求的入口和出口

// 基本用法

// 原理 format token stream (日志分割)

// 源码

// 四、

// log4js， 基本用法

// appenders(console, dateFile, file , smtp) category(命名空间) getLogger

// 用法中需要注意的是(先判断是否可用)

// debug用于平日的调试 info 请求的入口和出口 error上报错误 并发送到邮箱 （这里就需要说明框架的错误处理，以及堆栈信息的展现）
