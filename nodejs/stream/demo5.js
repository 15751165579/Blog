const { Transform } = require('stream')

const spliter = new Transform({
  readableObjectMode: true,
  writableObjectMode: true,
  transform (chunk, encoding, callback) {
    const arr = chunk.toString().trim().split(',')
    this.push(JSON.stringify(arr))
    callback()
  }
})

process.stdin
  .pipe(spliter)
  .pipe(process.stdout)

// pipe 也可以和事件结合起来用

// https://medium.freecodecamp.org/node-js-streams-everything-you-need-to-know-c9141306be93
// https://tech.meituan.com/2016/07/15/stream-internals.html