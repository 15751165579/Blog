/* istanbul ignore next */
module.exports = function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    const message = err.inner.name
    if (message === 'TokenExpiredError') {
      return res.status(401).json({
        code: 401,
        message: 'token过期'
      })
    } else if (message === 'JsonWebTokenError') {
      return res.status(401).json({
        code: 401,
        message: 'token无效'
      })
    }
  }
}