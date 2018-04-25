const Router = require('express').Router
const jwt = require('jsonwebtoken')
const Joi = require('joi')
const config = require('config')
const User = require('../models/user')
const router = new Router()

router.use((req, res, next) => {
  const options = req.body

  const scheme = Joi.object().keys({
    account: Joi.string().regex(/^1[34578]\d{9}$/).required(),
    password: Joi.string().regex(/^[a-zA-Z0-9]{6,30}$/).required()
  })
  Joi.validate(options, scheme, (err, value) => {
    if (err) {
      return res.json({
        code: 200,
        message: '参数格式不正确'
      })
    }
    next()
  })
})
router.post('/register', (req, res, next) => {
  const u = new User(req.body)
  u.save(err => {
    if (err) {
      return res.status(500).json({
        code: 500,
        message: '操作失败'
      })
    }
    res.json({
      code: 200,
      message: '注册成功'
    })
  })
})

router.post('/login', (req, res, next) => {
  const { account, password } = req.body
  User.findOne({
    account
  }, (err, user) => {
    if (err) {
      return res.status(500).json({
        code: 500,
        message: '操作失败'
      })
    }
    if (!user) {
      return res.status(500).json({
        code: 500,
        message: '用户不存在'
      })
    }
    user.comparePassword(password, err => {
      if (err) {
        return res.status(500).json({
          code: 500,
          message: err
        })
      }
      res.status(200).json({
        code: 200,
        token: jwt.sign({
          account
        }, config.JWT_SECRECT, {
          expiresIn: 60 * 60 * 2
        })
      })
    })
  })
})

module.exports = router
