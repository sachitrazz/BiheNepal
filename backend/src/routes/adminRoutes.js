const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const authMiddleware = require("../middleware/authMiddleware");

// All admin endpoints are protected by authentication first
router.use(authMiddleware);

// GET /admin/users
router.get("/users", adminController.getAllUsers);

// GET /admin/documents
router.get("/documents", adminController.getAllDocuments);

// PUT /admin/verify/:documentId
router.put("/verify/:documentId", adminController.verifyDocument);

// PUT /admin/reject/:documentId
router.put("/reject/:documentId", adminController.rejectDocument);

module.exports = router;
