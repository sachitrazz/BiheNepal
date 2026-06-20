const express = require('express')
const router = express.Router()
const authMiddleware = require('../middleware/auth')
const profileController = require('../controllers/profileController')

router.post('/create', authMiddleware, profileController.createProfile)
router.get('/me', authMiddleware, profileController.getMyProfile)
router.put('/update', authMiddleware, profileController.updateProfile)

module.exports = router
