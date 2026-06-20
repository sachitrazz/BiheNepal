import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import profileService from '../services/profileService.js'
import verificationService from '../services/verificationService.js'
import ProfileCompletionCard from '../components/ProfileCompletionCard.jsx'
import VerificationStatusCard from '../components/VerificationStatusCard.jsx'

function DashboardPage() {
  const { user, token } = useAuth()
  const [profile, setProfile] = useState(null)
  const [documents, setDocuments] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      try {
        const profileResponse = await profileService.getMyProfile(token)
        setProfile(profileResponse.profile)
      } catch (err) {
        setProfile(null)
      }
      try {
        const docsResponse = await verificationService.status(token)
        setDocuments(docsResponse.documents || [])
      } catch (err) {
        setDocuments([])
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [token])

  return (
    <div className="space-y-8">
      <div className="grid gap-6 md:grid-cols-[1.4fr_0.9fr]">
        <div className="card space-y-5">
          <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Welcome back</p>
          <h1 className="text-3xl font-bold text-white">Your private matchmaking dashboard</h1>
          <p className="text-slate-400">Only you can edit and review your profile details. Photos and phone numbers remain hidden.</p>
          <div className="grid gap-3 sm:grid-cols-2">
            <Link to={profile ? '/profile/edit' : '/profile/create'} className="rounded-2xl bg-slate-800 px-5 py-4 text-left text-slate-100 transition hover:bg-slate-700">
              <p className="text-sm text-slate-400">Profile</p>
              <p className="mt-2 text-lg font-semibold">{profile ? 'Edit profile' : 'Create profile'}</p>
            </Link>
            <Link to="/verification" className="rounded-2xl bg-slate-800 px-5 py-4 text-left text-slate-100 transition hover:bg-slate-700">
              <p className="text-sm text-slate-400">Verification</p>
              <p className="mt-2 text-lg font-semibold">Upload documents</p>
            </Link>
          </div>
        </div>
        <div className="space-y-5">
          <ProfileCompletionCard profile={profile} />
          <VerificationStatusCard documents={documents} />
        </div>
      </div>

      <div className="card">
        <h2 className="section-title">Privacy-first messaging</h2>
        <p className="mt-3 text-slate-400">Your profile displays only the details needed for matches, while sensitive data remains hidden from public view. Admins handle identity verification separately.</p>
      </div>
      {loading && <div className="text-slate-300">Loading profile data...</div>}
    </div>
  )
}

export default DashboardPage
