const { spawn } = require('child_process')

/**
 * spawn中的其它选项
 */

//  const child = spawn('find', ['./node/', '-type', 'f']) // 普通的方式

// const child = spawn('find ./node/ -type f', {
//   stdio: 'inherit', // 继承主进程的IO流
//   shell: true
// })

const child = spawn('find . -type f', {
  stdio: 'inherit',
  shell: true,
  cwd: '/Users/daiqingyun/tool/Blog/node' // 更改工作目录
})

// 后台运行 detached: true 对于一个长期运行的子进程很有效

console.log(child)

// child.stdout.on('data', data => {
//   console.log(data.toString())
// })