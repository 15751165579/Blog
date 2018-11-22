const fs = require('fs')
const path = require('path')

const readFilePath = path.resolve(__dirname, './demo1.txt')
const writeFilePath = path.resolve(__dirname, './d1.txt')

const readStream = fs.createReadStream(readFilePath)
const writeStream = fs.createWriteStream(writeFilePath)

readStream.pipe(writeStream)

readStream.on('end', () => {
  console.log('写入成功')
})