import { useState } from 'react'

function PhoneInputForm({ onSubmit, loading }) {
  const [phone, setPhone] = useState('')

  return (
    <form
      className="card max-w-xl mx-auto space-y-5"
      onSubmit={(event) => {
        event.preventDefault()
        onSubmit(phone)
      }}
    >
      <div>
        <h2 className="section-title">Secure login</h2>
        <p className="mt-2 text-slate-400">Enter your phone number to receive a one-time private OTP.</p>
      </div>
      <div className="input-group">
        <label htmlFor="phone" className="text-slate-200 font-medium">
          Phone number
        </label>
        <input
          id="phone"
          type="tel"
          value={phone}
          onChange={(event) => setPhone(event.target.value)}
          placeholder="+977 98XXXXXXXX"
          className="rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none transition focus:border-accent"
          required
        />
      </div>
      <button
        type="submit"
        className="w-full rounded-2xl bg-accent py-3 text-sm font-semibold text-white transition hover:bg-blue-500"
        disabled={loading}
      >
        {loading ? 'Sending OTP...' : 'Send OTP'}
      </button>
    </form>
  )
}

export default PhoneInputForm
