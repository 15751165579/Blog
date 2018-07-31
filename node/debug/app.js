const debug = require('debug')('demo')
const express = require('express')

const app = express()

debug.enabled = true

app.get('/', (req, res) => {
  debug(`当前请求的路径 ${req.path}`)
  res.end('hello world')
  debug('请求结束')
})

app.listen(9999)
