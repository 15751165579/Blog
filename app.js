const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const uri = 'mongodb://localhost/test'

global.db = mongoose.createConnection(uri)

const app = express()
const port = 8000

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