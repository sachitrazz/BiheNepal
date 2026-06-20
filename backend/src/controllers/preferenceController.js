const prisma = require("../config/database");

/**
 * Create partner preferences
 * POST /preferences
 */
const createPreferences = async (req, res) => {
  try {
    const userId = req.user.id;
    const {
      preferredAgeMin,
      preferredAgeMax,
      preferredCaste,
      preferredReligion,
      preferredEducation,
      preferredLocation,
    } = req.body;

    // Check if preferences already exist
    const existingPreference = await prisma.preference.findUnique({
      where: { userId },
    });

    if (existingPreference) {
      return res.status(400).json({ message: "Preferences already exist for this user. Use PUT to update." });
    }

    const preference = await prisma.preference.create({
      data: {
        userId,
        preferredAgeMin: preferredAgeMin ? parseInt(preferredAgeMin, 10) : null,
        preferredAgeMax: preferredAgeMax ? parseInt(preferredAgeMax, 10) : null,
        preferredCaste: preferredCaste || null,
        preferredReligion: preferredReligion || null,
        preferredEducation: preferredEducation || null,
        preferredLocation: preferredLocation || null,
      },
    });

    return res.status(201).json({
      message: "Preferences created successfully.",
      preference,
    });
  } catch (error) {
    console.error("Create Preferences Error:", error);
    return res.status(500).json({ message: "An error occurred while creating preferences.", error: error.message });
  }
};

/**
 * Get partner preferences by userId
 * GET /preferences/:userId
 */
const getPreferences = async (req, res) => {
  try {
    const { userId } = req.params;

    const preference = await prisma.preference.findUnique({
      where: { userId },
    });

    if (!preference) {
      return res.status(404).json({ message: "Preferences not found for this user." });
    }

    return res.status(200).json({ preference });
  } catch (error) {
    console.error("Get Preferences Error:", error);
    return res.status(500).json({ message: "An error occurred while retrieving preferences.", error: error.message });
  }
};

/**
 * Update partner preferences by userId
 * PUT /preferences/:userId
 */
const updatePreferences = async (req, res) => {
  try {
    const { userId } = req.params;
    const authUserId = req.user.id;
    const userRole = req.user.role;

    const {
      preferredAgeMin,
      preferredAgeMax,
      preferredCaste,
      preferredReligion,
      preferredEducation,
      preferredLocation,
    } = req.body;

    // Check ownership (must be the authenticated user or an admin)
    if (userId !== authUserId && userRole !== "ADMIN") {
      return res.status(403).json({ message: "Access denied. You do not own these preferences." });
    }

    // Verify preference exists
    const existingPreference = await prisma.preference.findUnique({
      where: { userId },
    });

    if (!existingPreference) {
      return res.status(404).json({ message: "Preferences not found for this user." });
    }

    const updatedPreference = await prisma.preference.update({
      where: { userId },
      data: {
        preferredAgeMin: preferredAgeMin !== undefined ? (preferredAgeMin ? parseInt(preferredAgeMin, 10) : null) : undefined,
        preferredAgeMax: preferredAgeMax !== undefined ? (preferredAgeMax ? parseInt(preferredAgeMax, 10) : null) : undefined,
        preferredCaste: preferredCaste !== undefined ? preferredCaste : undefined,
        preferredReligion: preferredReligion !== undefined ? preferredReligion : undefined,
        preferredEducation: preferredEducation !== undefined ? preferredEducation : undefined,
        preferredLocation: preferredLocation !== undefined ? preferredLocation : undefined,
      },
    });

    return res.status(200).json({
      message: "Preferences updated successfully.",
      preference: updatedPreference,
    });
  } catch (error) {
    console.error("Update Preferences Error:", error);
    return res.status(500).json({ message: "An error occurred while updating preferences.", error: error.message });
  }
};

module.exports = {
  createPreferences,
  getPreferences,
  updatePreferences,
};
