const express = require('express')
const log4js = require('log4js')
const path = require('path')
const app = express()

log4js.configure({
  appenders: {
    // 日常调试
    out: {
      type: 'console',
      layout: {
        type: 'pattern',
        pattern: '%[[%d] %p %c -%] %z %m',
        tokens: {
          pid: 123123
        }
      }
    },
    // access.log记录一些访问信息
    df: {
      type: 'dateFile',
      filename: path.join(__dirname, 'logs/access.log'),
      pattern: '.yyyy-MM-dd',
      alwaysIncludePattern: true,
      daysToKeep: 30,
      keepFileExt: true
    },
    // 错误信息
    error: {
      type: 'file',
      filename: path.join(__dirname, 'logs/error.log'),
      maxLogSize: 1024 * 1024 * 10,
      backups: 5
    },
    email: {
      type: '@log4js-node/smtp',
      recipients: '15751165579@163.com',
      sendInterval: 5,
      sender: '1162438119@qq.com', // 必须设置
      transport: 'SMTP',
      SMTP: {
        host: 'smtp.qq.com',
        secureConnection: true,
        port: 465,
        auth: {
          user: '1162438119@qq.com',
          pass: 'xxxxx' // qq邮箱这里会生成一个授权密码
        },
        debug: true
      }
    }
  },
  categories: {
    default: {
      appenders: ['out'],
      level: 'debug'
    },
    app: {
      appenders: ['df'],
      level: 'info'
    },
    handle: {
      appenders: ['error', 'email'],
      level: 'error'
    }
  }
})

const debug = log4js.getLogger()
const accessLog = log4js.getLogger('app')
const errorLog = log4js.getLogger('handle')

app.use(log4js.connectLogger(accessLog, { level: 'info' }))

app.get('/', (req, res) => {
  debug.debug(`${req.path} ${req.method}`)
  res.end('hello world')
  try {
    throw new Error('预期之外的错误')
  } catch (e) {
    errorLog.error(e.message)
  }
})

app.listen(9999)