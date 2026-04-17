const jwt = require('jsonwebtoken')
const { loadEnvConfig } = require('../config/env')

const env = loadEnvConfig()

function requireAuth(req, res, next) {
  const authorizationHeader = req.headers.authorization || ''

  if (!authorizationHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      success: false,
      error: 'Yetkilendirme başarısız. Lütfen giriş yapın.',
    })
  }

  const token = authorizationHeader.slice('Bearer '.length).trim()

  if (!token) {
    return res.status(401).json({
      success: false,
      error: 'Yetkilendirme başarısız. Geçerli bir token gönderin.',
    })
  }

  try {
    const payload = jwt.verify(token, env.jwtSecret)

    req.user = {
      id: payload.id,
      email: payload.email,
    }

    return next()
  } catch {
    return res.status(401).json({
      success: false,
      error: 'Oturum geçersiz veya süresi dolmuş. Lütfen tekrar giriş yapın.',
    })
  }
}

module.exports = {
  requireAuth,
}
