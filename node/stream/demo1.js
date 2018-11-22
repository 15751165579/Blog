const fs = require('fs')
const path = require('path')

const readFilePath = path.resolve(__dirname, './demo1.txt')
const writeFilePath = path.resolve(__dirname, './d1.txt')

fs.readFile(readFilePath, (err, data) => {
  if (err) {
    console.log('读取文件失败')
    return false
  }
  fs.writeFile(writeFilePath, data, err => {
    if (err) {
      console.log('写入失败')
      return false
    }
    console.log('写入成功')
  })
})