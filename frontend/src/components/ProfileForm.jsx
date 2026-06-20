import { useState } from 'react'

const sections = [
  {
    title: 'Personal',
    fields: [
      { name: 'gender', label: 'Gender', type: 'text' },
      { name: 'dateOfBirth', label: 'Date of birth', type: 'date' },
      { name: 'height', label: 'Height', type: 'text' },
    ],
  },
  {
    title: 'Religion',
    fields: [
      { name: 'religion', label: 'Religion', type: 'text' },
      { name: 'caste', label: 'Caste', type: 'text' },
      { name: 'motherTongue', label: 'Mother tongue', type: 'text' },
    ],
  },
  {
    title: 'Education',
    fields: [
      { name: 'highestQualification', label: 'Qualification', type: 'text' },
      { name: 'college', label: 'College', type: 'text' },
      { name: 'occupation', label: 'Occupation', type: 'text' },
      { name: 'incomeRange', label: 'Income range', type: 'text' },
    ],
  },
  {
    title: 'Lifestyle',
    fields: [
      { name: 'smoking', label: 'Smoking', type: 'text' },
      { name: 'drinking', label: 'Drinking', type: 'text' },
      { name: 'diet', label: 'Diet', type: 'text' },
    ],
  },
  {
    title: 'Location',
    fields: [
      { name: 'district', label: 'District', type: 'text' },
      { name: 'province', label: 'Province', type: 'text' },
      { name: 'country', label: 'Country', type: 'text' },
    ],
  },
  {
    title: 'Partner preferences',
    fields: [
      { name: 'preferredAgeMin', label: 'Preferred age min', type: 'number' },
      { name: 'preferredAgeMax', label: 'Preferred age max', type: 'number' },
      { name: 'preferredReligion', label: 'Preferred religion', type: 'text' },
      { name: 'preferredCaste', label: 'Preferred caste', type: 'text' },
      { name: 'preferredEducation', label: 'Preferred education', type: 'text' },
    ],
  },
]

function ProfileForm({ initialValues = {}, onSubmit, loading }) {
  const [form, setForm] = useState({
    gender: '',
    dateOfBirth: '',
    height: '',
    religion: '',
    caste: '',
    motherTongue: '',
    highestQualification: '',
    college: '',
    occupation: '',
    incomeRange: '',
    smoking: '',
    drinking: '',
    diet: '',
    district: '',
    province: '',
    country: '',
    preferredAgeMin: '',
    preferredAgeMax: '',
    preferredReligion: '',
    preferredCaste: '',
    preferredEducation: '',
    ...initialValues,
  })

  const handleChange = (field) => (event) => {
    setForm({ ...form, [field]: event.target.value })
  }

  return (
    <form
      className="space-y-8"
      onSubmit={(event) => {
        event.preventDefault()
        onSubmit(form)
      }}
    >
      {sections.map((section) => (
        <section key={section.title} className="card space-y-4">
          <div>
            <h2 className="section-title">{section.title}</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {section.fields.map((field) => (
              <label key={field.name} className="input-group">
                <span className="text-slate-200">{field.label}</span>
                <input
                  type={field.type}
                  value={form[field.name] || ''}
                  onChange={handleChange(field.name)}
                  className="rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none transition focus:border-accent"
                />
              </label>
            ))}
          </div>
        </section>
      ))}
      <button
        type="submit"
        className="rounded-2xl bg-accent px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-500"
        disabled={loading}
      >
        {loading ? 'Saving...' : 'Save profile'}
      </button>
    </form>
  )
}

export default ProfileForm
