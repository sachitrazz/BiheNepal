import { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext.jsx'
import verificationService from '../services/verificationService.js'
import DocumentUploader from '../components/DocumentUploader.jsx'
import VerificationStatusCard from '../components/VerificationStatusCard.jsx'

function VerificationPage() {
  const { token } = useAuth()
  const [documents, setDocuments] = useState([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    async function loadStatus() {
      try {
        const response = await verificationService.status(token)
        setDocuments(response.documents)
      } catch (err) {
        setDocuments([])
      } finally {
        setLoading(false)
      }
    }
    loadStatus()
  }, [token])

  const handleUpload = async (formData) => {
    setUploading(true)
    setMessage('')
    try {
      await verificationService.upload(formData, token)
      const response = await verificationService.status(token)
      setDocuments(response.documents)
      setMessage('Document uploaded. Verification is pending.')
    } catch (err) {
      setMessage('Upload failed. Please try again with a valid document.')
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="space-y-8">
      <div className="card">
        <h1 className="text-3xl font-bold text-white">Verification</h1>
        <p className="mt-3 text-slate-400">Upload your identity document to begin the verification process. Documents are not displayed publicly.</p>
      </div>
      {message && <div className="rounded-3xl border border-slate-700 bg-slate-900 px-6 py-4 text-sm text-slate-200">{message}</div>}
      <DocumentUploader onSubmit={handleUpload} loading={uploading} />
      {loading ? (
        <div className="text-slate-300">Loading verification status...</div>
      ) : (
        <VerificationStatusCard documents={documents} />
      )}
    </div>
  )
}

export default VerificationPage
