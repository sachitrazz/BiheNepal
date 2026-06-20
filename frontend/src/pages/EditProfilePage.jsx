import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import profileService from '../services/profileService.js'
import ProfileForm from '../components/ProfileForm.jsx'

function EditProfilePage() {
  const { token } = useAuth()
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    async function loadProfile() {
      try {
        const response = await profileService.getMyProfile(token)
        setProfile(response.profile)
      } catch (err) {
        setProfile(null)
      } finally {
        setLoading(false)
      }
    }
    loadProfile()
  }, [token])

  const handleSubmit = async (values) => {
    setSaving(true)
    setMessage('')
    try {
      await profileService.update(values, token)
      setMessage('Profile updated successfully.')
      navigate('/dashboard')
    } catch (err) {
      setMessage('Unable to update profile. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return <div className="text-slate-300">Loading profile...</div>
  }

  return (
    <div className="space-y-8">
      <div className="card">
        <h1 className="text-3xl font-bold text-white">Edit your profile</h1>
        <p className="mt-3 text-slate-400">Update your details anytime while keeping your profile private.</p>
      </div>
      {message && <div className="rounded-3xl border border-slate-700 bg-slate-900 px-6 py-4 text-sm text-slate-200">{message}</div>}
      {profile ? (
        <ProfileForm initialValues={profile} onSubmit={handleSubmit} loading={saving} />
      ) : (
        <div className="rounded-3xl border border-slate-700 bg-slate-900 px-6 py-6 text-slate-300">No profile found. Please create a profile first.</div>
      )}
    </div>
  )
}

export default EditProfilePage
