const { fork } = require('child_process')
const path = require('path')

const forked = fork(path.join(__dirname, './child.js'))

forked.on('message', msg => {
  console.log(`message from child: ${msg}`)
  if (msg === 10) {
    forked.send('你很棒')
  }
})

// 和 spawn 的区别 是进程之间的通信不太一样