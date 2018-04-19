const Router = require('express').Router
const router = new Router()
const student = require('./students')

router.use(student)

module.exports = router