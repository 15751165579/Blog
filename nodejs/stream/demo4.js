const Readable = require('stream').Readable
const WS = require('stream').Writable

const rs = new Readable()

rs.push('Hello')
rs.push('NodeJS')

rs._read = function () {}
rs.pipe(process.stdout)


const ws = new WS()

ws._write = (chunk,  enc, next) => {
  console.log(chunk.toString())
  next()
}

process.stdin.pipe(ws)