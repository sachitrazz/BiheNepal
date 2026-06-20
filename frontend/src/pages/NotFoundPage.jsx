import { Link } from 'react-router-dom'

function NotFoundPage() {
  return (
    <div className="card max-w-2xl mx-auto text-center">
      <h1 className="text-4xl font-bold text-white">Page not found</h1>
      <p className="mt-4 text-slate-400">We couldn't find that page. Return to the homepage to continue.</p>
      <Link to="/" className="mt-6 inline-flex rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white hover:bg-blue-500">
        Back to home
      </Link>
    </div>
  )
}

export default NotFoundPage
