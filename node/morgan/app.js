/**
 * Morgan 日志的使用。
 * 定位： 记录请求
 * 主要的组成  token、format、stream
 */
const express = require('express')
const morgan = require('morgan')
const moment = require('moment')
const fs = require('fs')
const path = require('path')
const fileStreamRotator = require('file-stream-rotator')

const app = express()

// format：顾名思义是日志的输出格式，系统提供一些默认的format的如combined,、dev等
// token: 组成format的各个字段，系统会提供一些默认字段，我们也可以注册新的字段。
// stream: 日志输入的方式，默认为控制台的输出。

// 存储到文件

morgan.token('time', () => moment().utc().utcOffset(8).format('YYYY-MM-DD HH:mm:ss:SSS'))

morgan.format('demo', ':time【demo】 :status :url :method :user-agent')

// 存储的目录 按照每天来存储
const storageDir = path.join(__dirname, 'logs')

fs.existsSync(storageDir) || fs.mkdirSync(storageDir)

const accessStream = fileStreamRotator.getStream({
  date_format: 'YYYY-MM-DD',
  filename: path.join(storageDir, 'access-%DATE%.log'),
  frequency: 'daily',
  verbose: false,
  size: '10M'
})

app.use(morgan('demo', { stream : accessStream }))
app.get('/', (req, res) => {
  res.end('hello world')
})

app.listen(9999)