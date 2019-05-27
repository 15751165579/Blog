// 四种创建子进程的方式: spawn
const { spawn } = require('child_process')

const child = spawn('pwd')

/** 
 * 注册的事件：
 * disconnect: 父进程主动调用child.disconnect
 * close: stdio流关闭
 * error: 如果进程不能被衍生或者杀死
 * message: 进程之间的通信
 */

child.on('exit', (code, signal) => {
  console.log(`child process exited with code ${code} signal ${signal}`)
})

child.stdout.on('data', (data) => {
  console.log(`child stdout:\n${data}`);
});

child.stderr.on('data', (data) => {
  console.error(`child stderr:\n${data}`);
});

child.stdin.on('data', data => {
  console.log(`child stdin:\n${data}`)
})