import { Routes, Route, Navigate } from 'react-router-dom'
import MainLayout from '../layouts/MainLayout.jsx'
import LandingPage from '../pages/LandingPage.jsx'
import LoginPage from '../pages/LoginPage.jsx'
import VerifyOtpPage from '../pages/VerifyOtpPage.jsx'
import DashboardPage from '../pages/DashboardPage.jsx'
import CreateProfilePage from '../pages/CreateProfilePage.jsx'
import EditProfilePage from '../pages/EditProfilePage.jsx'
import VerificationPage from '../pages/VerificationPage.jsx'
import NotFoundPage from '../pages/NotFoundPage.jsx'
import ProtectedRoute from '../components/ProtectedRoute.jsx'
import { useAuth } from '../context/AuthContext.jsx'

function AppRoutes() {
  const { isAuthenticated } = useAuth()

  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<LandingPage />} />
        <Route
          path="login"
          element={isAuthenticated ? <Navigate to="/dashboard" /> : <LoginPage />}
        />
        <Route
          path="verify-otp"
          element={isAuthenticated ? <Navigate to="/dashboard" /> : <VerifyOtpPage />}
        />
        <Route
          path="dashboard"
          element={<ProtectedRoute><DashboardPage /></ProtectedRoute>}
        />
        <Route
          path="profile/create"
          element={<ProtectedRoute><CreateProfilePage /></ProtectedRoute>}
        />
        <Route
          path="profile/edit"
          element={<ProtectedRoute><EditProfilePage /></ProtectedRoute>}
        />
        <Route
          path="verification"
          element={<ProtectedRoute><VerificationPage /></ProtectedRoute>}
        />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}

export default AppRoutes
