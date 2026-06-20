function VerificationStatusCard({ documents }) {
  const latest = documents?.[0]
  const status = latest?.verificationStatus || 'none'

  return (
    <div className="card max-w-md space-y-4">
      <h2 className="section-title">Verification status</h2>
      <p className="text-slate-400">Your document uploads are stored privately and only visible to authorized admins.</p>
      <div className="rounded-3xl border border-slate-700 bg-slate-900 p-4">
        <p className="font-medium text-white">Latest status</p>
        <p className="mt-2 text-lg font-semibold text-white">{status === 'none' ? 'Not submitted' : status}</p>
        {latest && (
          <p className="mt-2 text-sm text-slate-400">Type: {latest.documentType}</p>
        )}
      </div>
    </div>
  )
}

export default VerificationStatusCard
