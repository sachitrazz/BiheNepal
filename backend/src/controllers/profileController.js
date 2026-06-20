const prisma = require("../config/database");

/**
 * Create user profile
 * POST /profile
 */
const createProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const {
      fullName,
      gender,
      dob,
      height,
      caste,
      religion,
      education,
      occupation,
      income,
      district,
      interests,
      bio,
    } = req.body;

    // Validate mandatory fields
    if (!fullName || !gender || !dob || !district) {
      return res.status(400).json({ message: "fullName, gender, dob, and district are required." });
    }

    // Check if user already has a profile
    const existingProfile = await prisma.profile.findUnique({
      where: { userId },
    });

    if (existingProfile) {
      return res.status(400).json({ message: "Profile already exists for this user. Use PUT to update." });
    }

    // Create the profile
    const profile = await prisma.profile.create({
      data: {
        userId,
        fullName,
        gender,
        dob: new Date(dob),
        height: height ? parseFloat(height) : null,
        caste: caste || null,
        religion: religion || null,
        education: education || null,
        occupation: occupation || null,
        income: income ? parseFloat(income) : null,
        district,
        interests: Array.isArray(interests) ? interests : [],
        bio: bio || null,
      },
    });

    return res.status(201).json({
      message: "Profile created successfully.",
      profile,
    });
  } catch (error) {
    console.error("Create Profile Error:", error);
    return res.status(500).json({ message: "An error occurred while creating profile.", error: error.message });
  }
};

/**
 * Get profile by ID
 * GET /profile/:id
 */
const getProfile = async (req, res) => {
  try {
    const { id } = req.params;

    const profile = await prisma.profile.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            phone: true,
            role: true,
          },
        },
      },
    });

    if (!profile) {
      return res.status(404).json({ message: "Profile not found." });
    }

    return res.status(200).json({ profile });
  } catch (error) {
    console.error("Get Profile Error:", error);
    return res.status(500).json({ message: "An error occurred while retrieving profile.", error: error.message });
  }
};

/**
 * Update user profile
 * PUT /profile/:id
 */
const updateProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const userRole = req.user.role;

    const {
      fullName,
      gender,
      dob,
      height,
      caste,
      religion,
      education,
      occupation,
      income,
      district,
      interests,
      bio,
    } = req.body;

    // Find the profile first
    const profile = await prisma.profile.findUnique({
      where: { id },
    });

    if (!profile) {
      return res.status(404).json({ message: "Profile not found." });
    }

    // Ensure the authenticated user owns this profile (unless they are admin)
    if (profile.userId !== userId && userRole !== "ADMIN") {
      return res.status(403).json({ message: "Access denied. You do not own this profile." });
    }

    // Update the profile
    const updatedProfile = await prisma.profile.update({
      where: { id },
      data: {
        fullName: fullName !== undefined ? fullName : undefined,
        gender: gender !== undefined ? gender : undefined,
        dob: dob !== undefined ? new Date(dob) : undefined,
        height: height !== undefined ? (height ? parseFloat(height) : null) : undefined,
        caste: caste !== undefined ? caste : undefined,
        religion: religion !== undefined ? religion : undefined,
        education: education !== undefined ? education : undefined,
        occupation: occupation !== undefined ? occupation : undefined,
        income: income !== undefined ? (income ? parseFloat(income) : null) : undefined,
        district: district !== undefined ? district : undefined,
        interests: interests !== undefined ? (Array.isArray(interests) ? interests : []) : undefined,
        bio: bio !== undefined ? bio : undefined,
      },
    });

    return res.status(200).json({
      message: "Profile updated successfully.",
      profile: updatedProfile,
    });
  } catch (error) {
    console.error("Update Profile Error:", error);
    return res.status(500).json({ message: "An error occurred while updating profile.", error: error.message });
  }
};

module.exports = {
  createProfile,
  getProfile,
  updateProfile,
};
