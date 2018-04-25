const express = require('express')
const mongoose = require('mongoose')
const expressJWT = require('express-jwt')
const config = require('config')
const handleError = require('./middleware/handleError')

const bodyParser = require('body-parser')

global.db = mongoose.createConnection(config.URI)

const app = express()
let port = 3000

const api = require('./api')

app.use(expressJWT({
  secret: config.JWT_SECRECT
}).unless({
  path: [
    '/api/login',
    '/api/register'
  ]
}))

app.use(handleError)

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.text())
app.use(bodyParser.json({ type: 'application/json' }))

// api
app.use('/api', api)
app.listen(port)

// for testing
module.exports = app