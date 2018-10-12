const readline = require('readline')
let selected = 0
const choices = ['javascript', 'css', 'html']
const rl = readline.createInterface(process.stdin, process.stdout)
function reader () {
  let str = ''
  for (let i = 0; i < choices.length; i++) {
    str += `${selected === i ? '[X]' : '[ ]'} ${choices[i]}\r\n`
  }
  process.stdout.write(str)
}

reader()

process.stdin.on('keypress', (s, key) => {
  const name = key.name
  if (name === 'up' && selected > 0) {
    selected--
  } else if (name === 'down' && selected < choices.length - 1) {
    selected++
  } else {
    return true
  }
  readline.moveCursor(process.stdout, 0, -choices.length)
  readline.clearLine(process.stdout, -1)
  reader()
})

rl.on('line', () => {
  console.log(`you choose ${choices[selected]}`)
  process.exit(0)
}).on('close', () => {
  rl.close()
})