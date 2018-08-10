const express = require('express')
const redis = require('redis')
const { promisify } = require('util')
const app = express()
const client = redis.createClient()
const incrPromise = promisify(client.incrby).bind(client)
app.get('/score', async (req, res) => {
  const s = await incrPromise('score', 1) // 的确是原子性的
  console.log(s)
  res.json({})
})

app.listen(4000)