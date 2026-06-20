function ProfileCompletionCard({ profile }) {
  const fields = [
    'gender',
    'dateOfBirth',
    'height',
    'religion',
    'caste',
    'motherTongue',
    'highestQualification',
    'college',
    'occupation',
    'incomeRange',
    'smoking',
    'drinking',
    'diet',
    'district',
    'province',
    'country',
    'preferredAgeMin',
    'preferredAgeMax',
    'preferredReligion',
    'preferredCaste',
    'preferredEducation',
  ]
  const total = fields.length
  const filled = fields.reduce((count, key) => (profile?.[key] ? count + 1 : count), 0)
  const percent = Math.round((filled / total) * 100)

  return (
    <div className="card max-w-md space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="section-title">Profile completion</h2>
          <p className="text-slate-400">Only you can see your profile details.</p>
        </div>
        <div className="text-2xl font-semibold text-white">{percent}%</div>
      </div>
      <div className="h-3 overflow-hidden rounded-full bg-slate-800">
        <div className="h-full rounded-full bg-gradient-to-r from-blue-500 to-cyan-400" style={{ width: `${percent}%` }} />
      </div>
      <p className="text-sm text-slate-400">Complete your profile to improve matches while preserving privacy.</p>
    </div>
  )
}

export default ProfileCompletionCard
