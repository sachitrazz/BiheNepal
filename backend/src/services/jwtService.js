const jwt = require('jsonwebtoken')

function signToken(payload) {
  const secret = process.env.JWT_SECRET
  return jwt.sign(payload, secret, { expiresIn: '30d' })
}

module.exports = { signToken }
