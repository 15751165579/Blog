const redis = require('redis')
const c1 = redis.createClient()
const c2 = redis.createClient()
const c3 = redis.createClient()
const c4 = redis.createClient()
let count = 0

c1.on('psubscribe', (pattern, count) => {
  console.log(`client1 subscribe to ${pattern} ${count}`)
  c2.publish('channelone', '大爷，您的消息到了！')
  c3.publish('channeltwo', '另一个消息')
  c4.publish('channelthree', '上的哈哈艾斯德斯')
})

c1.on('punsubscribe', (pattern, count) => {
  console.log(`client1 unsubscribe to ${pattern} ${count}`)
  c4.end(false)
  c3.end(false)
  c2.end(false)
  c1.end(false)
})

c1.on('pmessage', (pattern, channel, message) => {
  console.log(`${pattern} recevied message on ${channel} : ${message}`)
  count++
  if (count === 3) {
    c1.punsubscribe()
  }
})

c1.psubscribe('channel*')