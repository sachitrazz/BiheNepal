import { useState } from 'react'

function DocumentUploader({ onSubmit, loading }) {
  const [documentType, setDocumentType] = useState('citizenship')
  const [file, setFile] = useState(null)

  return (
    <form
      className="card max-w-2xl mx-auto space-y-6"
      onSubmit={(event) => {
        event.preventDefault()
        if (!file) return
        const formData = new FormData()
        formData.append('documentType', documentType)
        formData.append('document', file)
        onSubmit(formData)
      }}
    >
      <div>
        <h2 className="section-title">Upload verification document</h2>
        <p className="mt-2 text-slate-400">Upload a citizenship, passport, or license document for review.</p>
      </div>
      <label className="input-group">
        <span className="text-slate-200">Document type</span>
        <select
          value={documentType}
          onChange={(event) => setDocumentType(event.target.value)}
          className="rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none"
        >
          <option value="citizenship">Citizenship</option>
          <option value="passport">Passport</option>
          <option value="license">License</option>
        </select>
      </label>
      <label className="input-group">
        <span className="text-slate-200">Document file</span>
        <input
          type="file"
          accept="image/*,.pdf"
          onChange={(event) => setFile(event.target.files?.[0] || null)}
          className="rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none"
        />
      </label>
      <button
        type="submit"
        className="w-full rounded-2xl bg-accent py-3 text-sm font-semibold text-white transition hover:bg-blue-500"
        disabled={loading}
      >
        {loading ? 'Uploading...' : 'Upload document'}
      </button>
    </form>
  )
}

export default DocumentUploader
