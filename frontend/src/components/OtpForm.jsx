import { useState } from 'react'

function OtpForm({ onSubmit, loading }) {
  const [otp, setOtp] = useState('')

  return (
    <form
      className="card max-w-xl mx-auto space-y-5"
      onSubmit={(event) => {
        event.preventDefault()
        onSubmit(otp)
      }}
    >
      <div>
        <h2 className="section-title">Verify OTP</h2>
        <p className="mt-2 text-slate-400">Enter the six-digit OTP sent to your phone.</p>
      </div>
      <div className="input-group">
        <label htmlFor="otp" className="text-slate-200 font-medium">
          OTP code
        </label>
        <input
          id="otp"
          type="text"
          value={otp}
          onChange={(event) => setOtp(event.target.value)}
          placeholder="123456"
          className="rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none transition focus:border-accent"
          maxLength={6}
          required
        />
      </div>
      <button
        type="submit"
        className="w-full rounded-2xl bg-accent py-3 text-sm font-semibold text-white transition hover:bg-blue-500"
        disabled={loading}
      >
        {loading ? 'Verifying...' : 'Verify OTP'}
      </button>
    </form>
  )
}

export default OtpForm
