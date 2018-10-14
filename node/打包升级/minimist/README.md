# 玩转Node-CLI

> 本文带你了解如何创建一个Node-CLI工具

### 一、命令行参数解析

  &emsp;&emsp;在NodeJS中可以通过以下代码获取命令行中传递的参数：

```JavaScript
  process.argv.slice(2)
```

  &emsp;&emsp;但是这对于构建一个CLI工具远远不够，首先需要考虑参数输入的各种风格：

  - Unix参数风格：前面加-，不过后面跟的是单个字符，例如-abc解析为['a', 'b', 'c']。
  - GNU参数风格：前面加--，例如npm中的命令，npm --save-dev webpack。
  - BSD参数风格：前面不加修饰符。

  &emsp;&emsp;这里可以通过正则表达式对process.argv进行加工：

```JavaScript
/**
 * 解析Unix、BSD和GNU参数风格
 * @param {Array} argv 命令行参数数组
 * @returns
 */
function parseArgv (argv) {
  const max = argv.length
  const result = {
    _: []
  }
  for (let i = 0; i < max; i++) {
    const arg = argv[i]
    const next = argv[i + 1]
    if (/^--.+/.test(arg)) {
      // GNU风格
      const key = arg.match(/^--(.+)/)[1]
      if (next != null && !/^-.+/.test(next)) {
        result[key] = next
        i++
      } else {
        result[key] = true
      }
    } else if (/^-[^-]+/.test(arg)) {
      // Unix风格
      const items = arg.match(/^-([^-]+)/)[1].split('')
      for (let j = 0, max = items.length; j < max; j++) {
        const item = items[j]
        // 非字母不解析
        if (!/[a-zA-Z]/.test(item)) {
          continue
        }
        if (next != null && !/^-.+/.test(next) && j === max - 1) {
          result[item] = next
          i++
        } else {
          result[item] = true
        }
      }
    } else {
      // BSD风格
      result._.push(arg)
    }
  }
  return result
}
```

  &emsp;&emsp;通过以上的方法可以得到如下结果：

```JavaScript
  node example1.js --save-dev -age 20 some
  // => 结果
  {
    _: ['some'],
    'save-dev': true,
    a: true,
    g: true,
    e: 20
  }
```

  &emsp;&emsp;上面这个示例不仅仅为了展示解析的结果，而且还强调了Unix参数风格只解析单个字母，所以这种风格的参数可能表达的意思不太明确，那么就需要正确的使用这种参数风格：

```s
  npm --save-dev webpack
  npm -D webpack
```

  &emsp;&emsp;npm中采用Unix参数风格表示简写，这是一种很好的使用方式，那么前面示例中的-age应该改用为--age更加合理一点。

### 二、命令行界面

  &emsp;&emsp;NodeJS中的readline模块提供question和prompt方法构建命令行界面，下面是一个简单的问答式的交互界面：

```JavaScript
const readline = require('readline');
const question = ['请输入您的姓名', '请输入您的年龄']
const result = []
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: `？${question[0]} `
});
rl.prompt();

rl.on('line', (line) => {
  result.push(line.trim())
  const max = result.length
  if (max === question.length) {
    rl.close()
  }
  rl.setPrompt(`？${question[max]} `)
  rl.prompt();
}).on('close', () => {
  console.log(`谢谢参与问答 *** 姓名: ${result[0]} 年龄: ${result[1]}`);
  process.exit(0);
}); 
```

  &emsp;&emsp;当然交互界面的元素并不只有这一种，在使用各类CLI工具时，你应该会遇到诸如：单项选择、下载进度条...

  &emsp;&emsp;下面可以尝试实现一个单项选择交互界面：

```JavaScript
const readline = require('readline')
let selected = 0
const choices = ['javascript', 'css', 'html']
let lineCount = 0
const rl = readline.createInterface(process.stdin, process.stdout)
function reader () {
  let str = ''
  for (let i = 0; i < choices.length; i++) {
    lineCount++
    str += `${selected === i ? '[X]' : '[ ]'} ${choices[i]}\r\n`
  }
  process.stdout.write(str)
}

reader()

process.stdin.on('keypress', (s, key) => {
  const name = key.name
  const max = choices.length
  if (name === 'up' && selected > 0) {
    selected--
  } else if (name === 'down' && selected < max - 1) {
    selected++
  } else if (name === 'down' && selected === max - 1) {
    selected = 0
  } else if (name === 'up' && selected === 0) {
    selected = max - 1
  } else {
    return true
  }
  // 移动光标，并且删除光标右边的内容
  readline.moveCursor(process.stdout, 0, -lineCount)
  readline.clearLine(process.stdout, -1)
  lineCount -= choices.length
  reader()
})

rl.on('line', () => {
  console.log(`you choose ${choices[selected]}`)
  process.exit(0)
}).on('close', () => {
  rl.close()
})
```

### 三、定制样式

  &emsp;&emsp;为了有效的区别命令行界面中信息的差异性，我们可以为这里输出信息添加适当的样式。

  &emsp;&emsp;这里介绍一下字符串添加样式的语法：

```s
  \x1b[背景颜色编号;字体颜色编号m
```

  &emsp;&emsp;每条样式都要以\x1b[开头：

```JavaScript
  // \x1b[0m 清除样式
  process.stdout.write('\x1b[44;37m OK \x1b[0m just do it\n')
```

### 四、自定义Node命令

  &emsp;&emsp;接下来就是自定义Node命令，首先需要创建一个命令执行的文件：

```JavaScript
  // hello.js
  #!/usr/bin/env node
  console.log('hello')
```

  &emsp;&emsp;再利用package.json中的bin配置：

```JavaScript
  {
    "bin": {
      "hello": "./hello.js"
    },
  }
```

  &emsp;&emsp;执行npm的link命令：

```s
  npm link
  
  # 输入自定义命令
  hello

  # 输出 hello
```

### 五、总结

  &emsp;&emsp;上面介绍了开发Node-CLI时所需要的一些基本知识，这里介绍几个开发Node-CLI常用的库：

  - [commander.js CLI开发框架](https://github.com/tj/commander.js)
  - [chalk.js 终端文字样式库](https://github.com/chalk/chalk)
  - [lnquirer.js 命令行交互信息收集库](https://github.com/SBoudrias/Inquirer.js)