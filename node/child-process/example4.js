const { execFile } = require('child_process')

execFile('node', ['--version'], (err, stdout) => {
  if (err) {
    console.error(err)
    return false
  }
  console.log(stdout)
})

// 与exec不同的是 没有创建新的shell，因此效率更高一点

// 所有子进程的创建方式多有*sync版本