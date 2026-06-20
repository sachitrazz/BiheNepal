import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import authService from '../services/authService.js'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('bihe_user')
    return saved ? JSON.parse(saved) : null
  })
  const [token, setToken] = useState(() => localStorage.getItem('bihe_token'))
  const [loading, setLoading] = useState(!!token)

  useEffect(() => {
    if (!token) {
      setLoading(false)
      return
    }
    authService
      .me(token)
      .then((response) => {
        setUser(response.user)
        localStorage.setItem('bihe_user', JSON.stringify(response.user))
      })
      .catch(() => {
        localStorage.removeItem('bihe_token')
        localStorage.removeItem('bihe_user')
        setUser(null)
        setToken(null)
      })
      .finally(() => setLoading(false))
  }, [token])

  const login = (authToken, authUser) => {
    setToken(authToken)
    setUser(authUser)
    localStorage.setItem('bihe_token', authToken)
    localStorage.setItem('bihe_user', JSON.stringify(authUser))
  }

  const logout = () => {
    authService.logout(token)
    setToken(null)
    setUser(null)
    localStorage.removeItem('bihe_token')
    localStorage.removeItem('bihe_user')
  }

  const value = useMemo(() => ({
    user,
    token,
    loading,
    isAuthenticated: Boolean(user && token),
    login,
    logout,
  }), [user, token, loading])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider')
  }
  return context
}
