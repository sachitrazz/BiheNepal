const otpStore = {}
const OTP_TTL_MS = 5 * 60 * 1000

function generateOtp(phone) {
  const otp = Math.floor(100000 + Math.random() * 900000).toString()
  otpStore[phone] = {
    otp,
    expiresAt: Date.now() + OTP_TTL_MS,
  }
  return otp
}

function verifyOtpForPhone(phone, otp) {
  const entry = otpStore[phone]
  if (!entry) return false
  if (Date.now() > entry.expiresAt) {
    delete otpStore[phone]
    return false
  }
  const isValid = entry.otp === otp
  if (isValid) {
    delete otpStore[phone]
  }
  return isValid
}

module.exports = { generateOtp, verifyOtpForPhone }
