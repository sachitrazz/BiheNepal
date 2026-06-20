import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import profileService from '../services/profileService.js'
import ProfileForm from '../components/ProfileForm.jsx'

function CreateProfilePage() {
  const { token } = useAuth()
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (values) => {
    setLoading(true)
    setMessage('')
    try {
      await profileService.create(values, token)
      setMessage('Profile created successfully.')
      navigate('/dashboard')
    } catch (err) {
      setMessage('Unable to create profile. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-8">
      <div className="card">
        <h1 className="text-3xl font-bold text-white">Create your private profile</h1>
        <p className="mt-3 text-slate-400">Complete your details once and keep control over what is shared.</p>
      </div>
      {message && <div className="rounded-3xl border border-slate-700 bg-slate-900 px-6 py-4 text-sm text-slate-200">{message}</div>}
      <ProfileForm onSubmit={handleSubmit} loading={loading} />
    </div>
  )
}

export default CreateProfilePage
