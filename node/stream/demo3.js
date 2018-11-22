const fs = require('fs')
const path = require('path')
const readline = require('readline')

const pathName = path.resolve(__dirname, './task-2018-11-20.log')
const readStream = fs.createReadStream(pathName)

const rl = readline.createInterface({
  input: readStream
})
let num = 0
rl.on('line', lineData => {
  if (lineData.includes('/api/v1/login')) {
    num++
  }
})

rl.on('close', () => {
  console.log('读取完成' + ': ' + num)
})