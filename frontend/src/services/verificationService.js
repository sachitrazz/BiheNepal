import api from './api.js'

const verificationService = {
  upload: (formData, token) => api.post('/verification/upload', formData, {
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' },
  }).then((res) => res.data),
  status: (token) => api.get('/verification/status', {
    headers: { Authorization: `Bearer ${token}` },
  }).then((res) => res.data),
}

export default verificationService
