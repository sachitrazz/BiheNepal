import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import authService from '../services/authService.js'
import PhoneInputForm from '../components/PhoneInputForm.jsx'

function LoginPage() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSendOtp = async (phone) => {
    setLoading(true)
    setError('')
    try {
      await authService.sendOtp(phone)
      sessionStorage.setItem('bihe_phone', phone)
      navigate('/verify-otp')
    } catch (err) {
      setError('Unable to send OTP. Please check the phone number.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div className="card">
        <h1 className="text-3xl font-bold text-white">Login securely with phone OTP</h1>
        <p className="mt-3 text-slate-400">We never display your phone number publicly.</p>
      </div>
      {error && <div className="rounded-3xl border border-red-500 bg-red-500/10 px-6 py-4 text-sm text-red-200">{error}</div>}
      <PhoneInputForm onSubmit={handleSendOtp} loading={loading} />
    </div>
  )
}

export default LoginPage
