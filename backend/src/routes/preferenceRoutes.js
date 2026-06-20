const express = require("express");
const router = express.Router();
const preferenceController = require("../controllers/preferenceController");
const authMiddleware = require("../middleware/authMiddleware");

// All preference endpoints are protected by authentication
router.use(authMiddleware);

// POST /preferences
router.post("/", preferenceController.createPreferences);

// GET /preferences/:userId
router.get("/:userId", preferenceController.getPreferences);

// PUT /preferences/:userId
router.put("/:userId", preferenceController.updatePreferences);

module.exports = router;
