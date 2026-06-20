const prisma = require("../config/database");

/**
 * Helper to calculate age from DOB string/date
 */
const calculateAge = (dob) => {
  if (!dob) return 0;
  const birthDate = new Date(dob);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
};

/**
 * Get matches for a specific profile ID
 * GET /matches/:profileId
 */
const getMatches = async (req, res) => {
  try {
    const { profileId } = req.params;

    // 1. Retrieve the source profile and its user's preferences
    const sourceProfile = await prisma.profile.findUnique({
      where: { id: profileId },
    });

    if (!sourceProfile) {
      return res.status(404).json({ message: "Profile not found." });
    }

    const sourcePreference = await prisma.preference.findUnique({
      where: { userId: sourceProfile.userId },
    });

    // 2. Determine gender filter for opposite gender matches
    const genderFilter = {};
    if (sourceProfile.gender) {
      const sourceGender = sourceProfile.gender.toUpperCase();
      if (sourceGender === "MALE") {
        genderFilter.gender = "FEMALE";
      } else if (sourceGender === "FEMALE") {
        genderFilter.gender = "MALE";
      }
    }

    // 3. Query all candidate profiles of the opposite gender
    const candidates = await prisma.profile.findMany({
      where: {
        id: { not: profileId },
        ...genderFilter,
      },
    });

    // 4. Calculate match scores
    const matches = candidates.map((candidate) => {
      let score = 0;

      // Same caste = 20
      if (
        sourceProfile.caste &&
        candidate.caste &&
        sourceProfile.caste.trim().toLowerCase() === candidate.caste.trim().toLowerCase()
      ) {
        score += 20;
      }

      // Same religion = 20
      if (
        sourceProfile.religion &&
        candidate.religion &&
        sourceProfile.religion.trim().toLowerCase() === candidate.religion.trim().toLowerCase()
      ) {
        score += 20;
      }

      // Education match = 15
      if (
        sourceProfile.education &&
        candidate.education &&
        sourceProfile.education.trim().toLowerCase() === candidate.education.trim().toLowerCase()
      ) {
        score += 15;
      }

      // Age preference match = 15
      if (sourcePreference) {
        const candidateAge = calculateAge(candidate.dob);
        const minAge = sourcePreference.preferredAgeMin || 18;
        const maxAge = sourcePreference.preferredAgeMax || 100;
        if (candidateAge >= minAge && candidateAge <= maxAge) {
          score += 15;
        }
      }

      // Location match = 10
      // Check if candidate's district matches the preference location or the source's district
      if (sourcePreference && sourcePreference.preferredLocation && candidate.district) {
        if (sourcePreference.preferredLocation.trim().toLowerCase() === candidate.district.trim().toLowerCase()) {
          score += 10;
        }
      } else if (
        sourceProfile.district &&
        candidate.district &&
        sourceProfile.district.trim().toLowerCase() === candidate.district.trim().toLowerCase()
      ) {
        score += 10;
      }

      // Interest overlap = 20
      const sourceInterests = Array.isArray(sourceProfile.interests) ? sourceProfile.interests : [];
      const candidateInterests = Array.isArray(candidate.interests) ? candidate.interests : [];
      if (sourceInterests.length > 0 && candidateInterests.length > 0) {
        const hasOverlap = sourceInterests.some((interest) =>
          candidateInterests.some((candidateInterest) => candidateInterest.trim().toLowerCase() === interest.trim().toLowerCase())
        );
        if (hasOverlap) {
          score += 20;
        }
      }

      return {
        profileId: candidate.id,
        matchScore: score,
        profile: candidate,
      };
    });

    // 5. Sort descending by score
    matches.sort((a, b) => b.matchScore - a.matchScore);

    // 6. Return top 20 matches
    const topMatches = matches.slice(0, 20);

    return res.status(200).json(topMatches);
  } catch (error) {
    console.error("Matchmaking Error:", error);
    return res.status(500).json({ message: "An error occurred during matchmaking.", error: error.message });
  }
};

module.exports = {
  getMatches,
};
