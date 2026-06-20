const cloudinary = require('cloudinary').v2
const dotenv = require('dotenv')

dotenv.config()

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

async function uploadDocument(file) {
  const uploadOptions = {
    resource_type: 'auto',
    folder: 'bihe_nepal/documents',
    use_filename: true,
    unique_filename: true,
  }
  const result = await cloudinary.uploader.upload(file.path, uploadOptions)
  return result
}

module.exports = { uploadDocument }
