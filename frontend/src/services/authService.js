import api from './api.js'

const authService = {
  sendOtp: (phone) => api.post('/auth/send-otp', { phone }).then((res) => res.data),
  verifyOtp: (phone, otp) => api.post('/auth/verify-otp', { phone, otp }).then((res) => res.data),
  me: (token) => api.get('/auth/me', { headers: { Authorization: `Bearer ${token}` } }).then((res) => res.data),
  logout: (token) => api.post('/auth/logout', {}, { headers: { Authorization: `Bearer ${token}` } }).then((res) => res.data),
}

export default authService
