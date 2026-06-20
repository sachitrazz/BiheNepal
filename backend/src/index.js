const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const authRoutes = require('./routes/auth')
const profileRoutes = require('./routes/profile')
const verificationRoutes = require('./routes/verification')

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/auth', authRoutes)
app.use('/api/profile', profileRoutes)
app.use('/api/verification', verificationRoutes)

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Privacy-first matrimony API' })
})

app.use((err, req, res, next) => {
  console.error(err)
  res.status(500).json({ error: 'Internal server error' })
})

const port = process.env.PORT || 4000
app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`)
})
