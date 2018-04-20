const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const uri = 'mongodb://localhost/test'

global.db = mongoose.createConnection(uri)

const app = express()
let port = process.env.PORT || (process.argv[2] || 3000)
port = (typeof port === 'number') ? port : /* istanbul ignore next */3000


const api = require('./api')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.text())
app.use(bodyParser.json({ type: 'application/json' }))

// api
app.use('/api', api)
app.listen(port)

// for testing
module.exports = app