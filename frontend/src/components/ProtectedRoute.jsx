import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth()
  if (loading) {
    return <div className="text-center text-slate-300">Loading...</div>
  }
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }
  return children
}

export default ProtectedRoute
