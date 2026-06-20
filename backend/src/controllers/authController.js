const prisma = require('../config/prismaClient')
const { generateOtp, verifyOtpForPhone } = require('../services/otpService')
const { signToken } = require('../services/jwtService')

exports.sendOtp = async (req, res) => {
  const { phone } = req.body
  if (!phone || typeof phone !== 'string') {
    return res.status(400).json({ error: 'Phone number is required' })
  }

  const otp = generateOtp(phone)
  console.log(`OTP for ${phone}: ${otp}`)

  return res.json({ message: 'OTP sent successfully' })
}

exports.verifyOtp = async (req, res) => {
  const { phone, otp } = req.body
  if (!phone || !otp) {
    return res.status(400).json({ error: 'Phone and OTP are required' })
  }

  const isValid = verifyOtpForPhone(phone, otp)
  if (!isValid) {
    return res.status(400).json({ error: 'Invalid or expired OTP' })
  }

  let user = await prisma.user.findUnique({ where: { phone } })
  if (!user) {
    user = await prisma.user.create({ data: { phone } })
  }

  const token = signToken({ userId: user.id, role: user.role })
  const profile = await prisma.profile.findUnique({ where: { userId: user.id } })

  return res.json({
    message: 'Authenticated successfully',
    token,
    user: {
      id: user.id,
      role: user.role,
      createdAt: user.createdAt,
      profile,
    },
  })
}

exports.getMe = async (req, res) => {
  const user = await prisma.user.findUnique({
    where: { id: req.user.id },
    include: { profile: true },
  })

  if (!user) {
    return res.status(404).json({ error: 'User not found' })
  }

  return res.json({
    user: {
      id: user.id,
      role: user.role,
      createdAt: user.createdAt,
      profile: user.profile,
    },
  })
}

exports.logout = async (req, res) => {
  return res.json({ message: 'Logged out successfully' })
}
