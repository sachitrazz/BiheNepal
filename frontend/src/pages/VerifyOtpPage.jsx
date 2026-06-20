import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import authService from '../services/authService.js'
import OtpForm from '../components/OtpForm.jsx'

function VerifyOtpPage() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const { login } = useAuth()
  const phone = sessionStorage.getItem('bihe_phone') || ''

  const handleVerifyOtp = async (otp) => {
    setLoading(true)
    setError('')
    try {
      const data = await authService.verifyOtp(phone, otp)
      login(data.token, data.user)
      navigate('/dashboard')
    } catch (err) {
      setError('Invalid OTP. Try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-8">
      <div className="card max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-white">Verify your login</h1>
        <p className="mt-3 text-slate-400">Enter the code from your phone to continue.</p>
      </div>
      {error && <div className="rounded-3xl border border-red-500 bg-red-500/10 px-6 py-4 text-sm text-red-200">{error}</div>}
      <OtpForm onSubmit={handleVerifyOtp} loading={loading} />
      <div className="text-sm text-slate-500">We will not display your phone number publicly.</div>
    </div>
  )
}

export default VerifyOtpPage
