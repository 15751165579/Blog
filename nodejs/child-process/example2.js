const { exec } = require('child_process')

exec('pwd', (err, stdout) => {
  if (err) {
    console.error(`error *** ${err}`)
    return
  }
  console.log(`stdout\n${stdout}`)
})

/**
 * 1、spawn并不会直接创建一个shell来执行，相比较exec的效率更高
 * 2、不是使用输出流的方式，而是将整个输出值传给回调函数(缓冲数据放在内存中)
 * 
 * 数据规模较小 可以使用exec 反之则使用spawn
 */