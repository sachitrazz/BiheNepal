const express = require('express')
const router = express.Router()
const authMiddleware = require('../middleware/auth')
const verificationController = require('../controllers/verificationController')

router.post('/upload', authMiddleware, verificationController.uploadDocument)
router.get('/status', authMiddleware, verificationController.getVerificationStatus)

module.exports = router
