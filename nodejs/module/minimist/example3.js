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
  lineCount -= choices.length
  reader()
})

rl.on('line', () => {
  console.log(`you choose ${choices[selected]}`)
  process.exit(0)
}).on('close', () => {
  rl.close()
})