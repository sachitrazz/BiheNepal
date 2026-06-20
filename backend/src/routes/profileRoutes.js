const express = require("express");
const router = express.Router();
const profileController = require("../controllers/profileController");
const authMiddleware = require("../middleware/authMiddleware");

// All profile endpoints are protected by authentication
router.use(authMiddleware);

// POST /profile
router.post("/", profileController.createProfile);

// GET /profile/:id
router.get("/:id", profileController.getProfile);

// PUT /profile/:id
router.put("/:id", profileController.updateProfile);

module.exports = router;
