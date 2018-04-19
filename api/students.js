const Router = require('express').Router
const Student = require('../models/students')
const router = new Router()

router.post('/students', (req, res, next) => {
  const options = req.body
  const s = new Student(options)
  s.save((err, result) => {
    if (err) {
      res.json({
        code: 0,
        message: '操作失败'
      })
      return
    }
    res.json(result)
  })
})

router.get('/students', (req, res, next) => {
  Student.find_all(req.query, (err, result) => {
    res.json(result)
  })
})

router.delete('/students', (req, res, next) => {
  const name = req.query.name
  Student.remove_by_name(name, (err, result) => {
    res.json(result)
  })
})

module.exports = router