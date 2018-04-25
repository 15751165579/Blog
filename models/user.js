const Schema = require('mongoose').Schema
const crypto = require('crypto')
const config = require('config')

const userSchema = new Schema({
  account: {
    type: String,
    require: true
  },
  password: {
    type: String,
    require: true,
    min: [6, '最小长度为6个字符'],
    max: [20, '最长为20个字符']
  }
})

userSchema.pre('save', function (next) {
  const hmac = crypto.createHmac('sha256', config.PASSWORD_SECRECT)
  hmac.update(this.password)
  this.password = hmac.digest('hex')
  next()
})

userSchema.methods.comparePassword = function (password, cb) {
  const hmac = crypto.createHmac('sha256', config.PASSWORD_SECRECT)
  hmac.update(password)
  if (this.password === hmac.digest('hex')) {
    return cb()
  }
  cb('密码错误')
}

module.exports = global.db.model('User', userSchema)