const prisma = require("../config/database");

/**
 * Helper middleware/check to ensure only ADMIN has access
 */
const checkAdminRole = (req, res) => {
  if (req.user.role !== "ADMIN") {
    res.status(403).json({ message: "Access denied. Admin access required." });
    return false;
  }
  return true;
};

/**
 * Get all users with their profiles and documents
 * GET /admin/users
 */
const getAllUsers = async (req, res) => {
  try {
    if (!checkAdminRole(req, res)) return;

    const users = await prisma.user.findMany({
      include: {
        profile: true,
        documents: true,
      },
    });

    // Exclude password field from the return objects
    const sanitizedUsers = users.map((u) => {
      const { password, ...userWithoutPassword } = u;
      return userWithoutPassword;
    });

    return res.status(200).json(sanitizedUsers);
  } catch (error) {
    console.error("Admin Get Users Error:", error);
    return res.status(500).json({ message: "An error occurred while retrieving users.", error: error.message });
  }
};

/**
 * Get all documents
 * GET /admin/documents
 */
const getAllDocuments = async (req, res) => {
  try {
    if (!checkAdminRole(req, res)) return;

    const documents = await prisma.document.findMany({
      include: {
        user: {
          select: {
            phone: true,
            role: true,
          },
        },
      },
    });

    return res.status(200).json(documents);
  } catch (error) {
    console.error("Admin Get Documents Error:", error);
    return res.status(500).json({ message: "An error occurred while retrieving documents.", error: error.message });
  }
};

/**
 * Verify a user document
 * PUT /admin/verify/:documentId
 */
const verifyDocument = async (req, res) => {
  try {
    if (!checkAdminRole(req, res)) return;

    const { documentId } = req.params;

    // Check if document exists
    const existingDoc = await prisma.document.findUnique({
      where: { id: documentId },
    });

    if (!existingDoc) {
      return res.status(404).json({ message: "Document not found." });
    }

    const document = await prisma.document.update({
      where: { id: documentId },
      data: {
        verificationStatus: "VERIFIED",
      },
    });

    return res.status(200).json({
      message: "Document verified successfully.",
      document,
    });
  } catch (error) {
    console.error("Admin Verify Document Error:", error);
    return res.status(500).json({ message: "An error occurred while verifying document.", error: error.message });
  }
};

/**
 * Reject a user document
 * PUT /admin/reject/:documentId
 */
const rejectDocument = async (req, res) => {
  try {
    if (!checkAdminRole(req, res)) return;

    const { documentId } = req.params;

    // Check if document exists
    const existingDoc = await prisma.document.findUnique({
      where: { id: documentId },
    });

    if (!existingDoc) {
      return res.status(404).json({ message: "Document not found." });
    }

    const document = await prisma.document.update({
      where: { id: documentId },
      data: {
        verificationStatus: "REJECTED",
      },
    });

    return res.status(200).json({
      message: "Document rejected successfully.",
      document,
    });
  } catch (error) {
    console.error("Admin Reject Document Error:", error);
    return res.status(500).json({ message: "An error occurred while rejecting document.", error: error.message });
  }
};

module.exports = {
  getAllUsers,
  getAllDocuments,
  verifyDocument,
  rejectDocument,
};
