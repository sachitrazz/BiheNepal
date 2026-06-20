import { Link } from 'react-router-dom'

function LandingPage() {
  return (
    <section className="space-y-16">
      <div className="grid gap-10 md:grid-cols-[1.2fr_0.8fr] items-center">
        <div className="space-y-6">
          <span className="rounded-full bg-slate-800 px-4 py-2 text-xs uppercase tracking-[0.3em] text-slate-300">
            Privacy-first matrimony
          </span>
          <h1 className="text-4xl font-bold text-white sm:text-5xl">
            Match with confidence, preserve your privacy.
          </h1>
          <p className="max-w-xl text-slate-400">
            BiheNepal is designed for modern users who want a secure matrimony experience without exposing personal identifiers or private documents.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link to="/login" className="rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-500">
              Get started
            </Link>
            <Link to="/verification" className="rounded-full border border-slate-700 px-6 py-3 text-sm text-slate-200 transition hover:border-white">
              Verification process
            </Link>
          </div>
        </div>
        <div className="rounded-[2rem] border border-slate-800 bg-slate-900/80 p-10 shadow-2xl shadow-slate-950/40">
          <h2 className="section-title">Why privacy matters</h2>
          <ul className="mt-6 space-y-4 text-slate-400">
            <li>• No public names, phones, or photos.</li>
            <li>• Only you can see your profile details.</li>
            <li>• Documents stay private and admin-only.</li>
            <li>• Simple OTP login keeps identity secure.</li>
          </ul>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {[
          { title: 'Private by default', description: 'Profiles are built for secure sharing and never reveal personal identifiers in public feeds.' },
          { title: 'OTP-based access', description: 'No passwords, no email. Login through your phone with temporary OTP access.' },
          { title: 'Controlled verification', description: 'Identity documents are encrypted and only visible to authorized review admins.' },
        ].map((card) => (
          <div key={card.title} className="card">
            <h3 className="text-xl font-semibold text-white">{card.title}</h3>
            <p className="mt-3 text-slate-400">{card.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default LandingPage
