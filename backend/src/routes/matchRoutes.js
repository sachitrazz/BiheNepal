const express = require("express");
const router = express.Router();
const matchController = require("../controllers/matchController");
const authMiddleware = require("../middleware/authMiddleware");

// All match endpoints are protected by authentication
router.use(authMiddleware);

// GET /matches/:profileId
router.get("/:profileId", matchController.getMatches);

module.exports = router;
