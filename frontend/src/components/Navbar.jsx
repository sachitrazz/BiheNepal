import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

function Navbar() {
  const { isAuthenticated, logout } = useAuth()

  return (
    <header className="border-b border-slate-700 bg-slate-950/90 backdrop-blur-md">
      <div className="container flex flex-wrap items-center justify-between gap-4 py-4">
        <Link to="/" className="text-xl font-semibold text-white">
          BiheNepal
        </Link>
        <nav className="flex flex-wrap gap-3">
          <Link to="/" className="text-slate-300 hover:text-white">
            Home
          </Link>
          {isAuthenticated ? (
            <>
              <Link to="/dashboard" className="text-slate-300 hover:text-white">
                Dashboard
              </Link>
              <button
                type="button"
                onClick={logout}
                className="rounded-full bg-slate-800 px-4 py-2 text-sm text-white transition hover:bg-slate-700"
              >
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" className="rounded-full bg-slate-800 px-4 py-2 text-sm text-white transition hover:bg-slate-700">
              Login
            </Link>
          )}
        </nav>
      </div>
    </header>
  )
}

export default Navbar
