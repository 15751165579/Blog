const mongodb = require('./mongodb')

const base = {
  JWT_SECRECT: 'jwt secrect'
}

module.exports = Object.assign({}, mongodb, base)