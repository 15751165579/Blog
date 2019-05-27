const readline = require('readline')

const rf = readline.createInterface(process.stdin, process.stdout)

process.stdout.write('123\n456\n789\n')

rf.on('line', () => {
  readline.moveCursor(process.stdout, 0, -2)
  readline.clearLine(process.stdout, 1) // 只是清除当前行的内容
})
