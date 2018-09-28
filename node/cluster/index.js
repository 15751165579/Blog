const cluster = require('cluster');
const http = require('http');
const numCPU = require('os').cpus().length;
const EventEmitter = require('events')

const data = {}
let count = 0

const customEvent = new EventEmitter()

if (cluster.isMaster) {
  // 主进程
  console.log(`主进程 [${process.pid}] 已经开启`)
  for (let i = 0; i < numCPU; i++) {
    const worker = cluster.fork()

    worker.on('listening', () => {
      console.log(`工作进程 ${worker.process.pid} 开启`)
    })

    worker.on('disconnect', () => {
      console.log(`工作进程 ${worker.process.pid} 关闭`)
    })
  }

  for (let id in cluster.workers) {
    cluster.workers[id].on('message', handleMessage)
  }

  customEvent.on('close-worker', () => {
    for (let id in cluster.workers) {
      cluster.workers[id].disconnect()
    }
    Object.keys(data).forEach(item => {
      console.log(`工作进程[${item}] ** 请求次数 ${data[item]}`)
    })
  })
} else {
  http.createServer((req, res) => {
    res.writeHead(200)
    res.end('hello world \n')

    process.send({
      pid: process.pid
    })
  }).listen(8000)
}

function handleMessage (obj) {
  const { pid } = obj
  if (!data[pid]) {
    data[pid] = 1
  } else {
    data[pid]++
  }
  // 请求的总数
  count++
  if (count === 10000) {
    customEvent.emit('close-worker')
  }
}