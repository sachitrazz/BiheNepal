const express = require('express')
const router = express.Router()
const authController = require('../controllers/authController')
const authMiddleware = require('../middleware/auth')

router.post('/send-otp', authController.sendOtp)
router.post('/verify-otp', authController.verifyOtp)
router.get('/me', authMiddleware, authController.getMe)
router.post('/logout', authMiddleware, authController.logout)

module.exports = router
