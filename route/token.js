const jwt = require('jsonwebtoken')
const SECRET = 'smilerain'

exports.addToken = function (params) {
  return jwt.sign(params, SECRET, { expiresIn: '7d' })
}

exports.decode = function (token) {
  if (token) {
    return jwt.decode(token.split(' ')[0], SECRET)
  }
}