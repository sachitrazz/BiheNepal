const prisma = require('../config/prismaClient')
const multer = require('multer')
const { uploadDocument } = require('../services/cloudinaryService')

const upload = multer({ dest: '/tmp/uploads' })

exports.uploadDocument = [
  upload.single('document'),
  async (req, res) => {
    const { documentType } = req.body
    if (!req.file || !documentType) {
      return res.status(400).json({ error: 'Document file and type are required' })
    }

    try {
      const uploadResult = await uploadDocument(req.file)
      const document = await prisma.document.create({
        data: {
          userId: req.user.id,
          documentType,
          documentUrl: uploadResult.secure_url,
          verificationStatus: 'pending',
        },
      })
      return res.json({ document: {
        id: document.id,
        documentType: document.documentType,
        verificationStatus: document.verificationStatus,
        createdAt: document.createdAt,
      } })
    } catch (error) {
      console.error(error)
      return res.status(500).json({ error: 'Upload failed' })
    }
  },
]

exports.getVerificationStatus = async (req, res) => {
  const documents = await prisma.document.findMany({
    where: { userId: req.user.id },
    orderBy: { createdAt: 'desc' },
  })
  return res.json({ documents })
}
