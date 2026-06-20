const jwt = require('jsonwebtoken')
const prisma = require('../config/prismaClient')

module.exports = async (req, res, next) => {
  const authHeader = req.headers.authorization
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  const token = authHeader.split(' ')[1]
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET)
    const user = await prisma.user.findUnique({ where: { id: payload.userId } })
    if (!user) {
      return res.status(401).json({ error: 'Unauthorized' })
    }
    req.user = { id: user.id, role: user.role }
    next()
  } catch (err) {
    return res.status(401).json({ error: 'Invalid token' })
  }
}
