# Node.js中process对象的几个小知识点

> process是一个全局对象，并且是EventEmitter的实例。

## process.env

  在前端构建工具中，我们通过设置process.env.NODE_ENV来区别开发环境和生成环境。

## process.argv

  这个属性主要用来获取命令行参数：

```JavaScript
  // app.js
  console.log(process.argv)

  // 控制台
  node app.js --age 20 man
  
  // [执行路径, 文件所在路径, '--age', '20', 'man']
```

  对于第一个”执行路径“，我们也可以单独获取：

```JavaScript
  console.log(process.execPath)
```

  当然我们要很优雅的处理这些参数，仅仅使用process.argv是不够的。这里我们可以使用TJ大神的一款作品[commander.js](https://github.com/tj/commander.js/)，下面我们可以看一个简单的例子：

```JavaScript
  // app.js
  const program = require('commander')
  program.option('-a, --age <age>', '年龄')
  .option('-I, --is-man [isMan]', '是男生吗？', false)
  .parse(process.argv)

  console.log(`${program.isMan ? '他' : '她'}今年${program.age}岁`)

  // 控制台
  node app.js --age 20 --is-man

  // 他今年20岁
```

## process.stdin和process.stdout

  这里可以通过一个例子了解一下它的用法：

```JavaScript
  process.stdin.setEncoding('utf8')

  process.stdin.on('readable', () => {
    const chunk = process.stdin.read()
    if (chunk !== null) {
      if (chunk.slice(0, chunk.length - 1) === 'end') {
        process.stdin.emit('end')
      } else {
        process.stdout.write(`您输入的是: ${chunk}`)
      }
    }
  });

  process.stdin.on('end', () => {
    process.stdout.write('end')
  })
```

> Tip:由于我们在控制台中，总是会以回车键结束，所以最终结果的末尾会加上回车键。

  关于终端交互同样有一个很优秀的框架[Inquirer.js](https://github.com/SBoudrias/Inquirer.js/)，同样通过一个例子看一下它的简单用法：

```JavaScript
  const inquirer = require('inquirer')
  const questions = [
    {
      type: 'input',
      name: 'name',
      message: '请输入您的姓名：'
    }
  ]

  inquirer.prompt(questions).then(res => {
    console.log(res.name)
  })
```

  实践上面的例子，你会发现控制台中部分文字的样式有些变化，这里我们使用[chalk](https://github.com/chalk/chalk)

```JavaScript
  console.log(chalk.rgb(123,2,123).underline('chalk is nice'))
  console.log(chalk.hex('#8928eb').bold('chalk is nice'))
  console.log(chalk.keyword('orange')('chalk is nice'))
```

## 退出控制台

  当所有任务执行完成后，Node会自动结束进程。

```JavaScript
  setInterval(_ => {
    console.log('定时器')
  }, 1000)
```

  运行这个例子，你可以发现控制台一直在打印'定时器'，那么这种情况下，我们该如何退出程序呢？

  第一种方法，我们可以通过control + c。

  第二种方法是使用process.exit(code):

```JavaScript
  setInterval(_ => {
    console.log('定时器')
    process.exit(1)
  }, 1000)

  process.on('exit', code => { 
    // 只允许同步操作
    console.log(`exit: ${code}`)
  })
```

  第二种方法是使用process.kill(pid)

```JavaScript
  setInterval(_ => {
    console.log('定时器')
    process.kill(process.pid)
  }, 1000)
```

  第三种方法就比较粗暴了，立即结束进程，并生成core文件:

```JavaScript
  setInterval(_ => {
    console.log('定时器')
    process.abort()
  }, 1000)
```

