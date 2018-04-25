const Router = require('express').Router
const router = new Router()
const user = require('./user')

router.use(user)

module.exports = router