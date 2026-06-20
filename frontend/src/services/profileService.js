import api from './api.js'

const profileService = {
  create: (profile, token) => api.post('/profile/create', profile, {
    headers: { Authorization: `Bearer ${token}` },
  }).then((res) => res.data),
  getMyProfile: (token) => api.get('/profile/me', {
    headers: { Authorization: `Bearer ${token}` },
  }).then((res) => res.data),
  update: (profile, token) => api.put('/profile/update', profile, {
    headers: { Authorization: `Bearer ${token}` },
  }).then((res) => res.data),
}

export default profileService
