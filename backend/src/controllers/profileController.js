const prisma = require('../config/prismaClient')

exports.createProfile = async (req, res) => {
  const data = req.body
  const existingProfile = await prisma.profile.findUnique({ where: { userId: req.user.id } })
  if (existingProfile) {
    return res.status(400).json({ error: 'Profile already exists' })
  }

  const profile = await prisma.profile.create({
    data: {
      userId: req.user.id,
      gender: data.gender,
      dateOfBirth: data.dateOfBirth ? new Date(data.dateOfBirth) : null,
      height: data.height,
      religion: data.religion,
      caste: data.caste,
      motherTongue: data.motherTongue,
      highestQualification: data.highestQualification,
      college: data.college,
      occupation: data.occupation,
      incomeRange: data.incomeRange,
      smoking: data.smoking,
      drinking: data.drinking,
      diet: data.diet,
      district: data.district,
      province: data.province,
      country: data.country,
      preferredAgeMin: data.preferredAgeMin ? Number(data.preferredAgeMin) : null,
      preferredAgeMax: data.preferredAgeMax ? Number(data.preferredAgeMax) : null,
      preferredReligion: data.preferredReligion,
      preferredCaste: data.preferredCaste,
      preferredEducation: data.preferredEducation,
    },
  })

  return res.json({ profile })
}

exports.getMyProfile = async (req, res) => {
  const profile = await prisma.profile.findUnique({ where: { userId: req.user.id } })
  if (!profile) {
    return res.status(404).json({ error: 'Profile not found' })
  }
  return res.json({ profile })
}

exports.updateProfile = async (req, res) => {
  const data = req.body
  const existingProfile = await prisma.profile.findUnique({ where: { userId: req.user.id } })
  if (!existingProfile) {
    return res.status(404).json({ error: 'Profile not found' })
  }

  const profile = await prisma.profile.update({
    where: { userId: req.user.id },
    data: {
      gender: data.gender,
      dateOfBirth: data.dateOfBirth ? new Date(data.dateOfBirth) : existingProfile.dateOfBirth,
      height: data.height,
      religion: data.religion,
      caste: data.caste,
      motherTongue: data.motherTongue,
      highestQualification: data.highestQualification,
      college: data.college,
      occupation: data.occupation,
      incomeRange: data.incomeRange,
      smoking: data.smoking,
      drinking: data.drinking,
      diet: data.diet,
      district: data.district,
      province: data.province,
      country: data.country,
      preferredAgeMin: data.preferredAgeMin ? Number(data.preferredAgeMin) : existingProfile.preferredAgeMin,
      preferredAgeMax: data.preferredAgeMax ? Number(data.preferredAgeMax) : existingProfile.preferredAgeMax,
      preferredReligion: data.preferredReligion,
      preferredCaste: data.preferredCaste,
      preferredEducation: data.preferredEducation,
    },
  })

  return res.json({ profile })
}
