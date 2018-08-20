const redis = require('redis')
const client = redis.createClient()
const { promisify } = require('util')

const pfadd = promisify(client.pfadd).bind(client)
const pfcount = promisify(client.pfcount).bind(client)

/**
 * UV数据统计
 */
function createUV () {
  const arr = new Array(100000).fill(0)
  return Promise.all(arr.map((item, index) => pfadd('data', `user${index + 1}`)))
}

createUV().then(() => {
  console.log('统计完成')
  return pfcount('data')
})
.then(res => {
  console.log(res)
})
.catch(err => {
  console.log(err)
})
