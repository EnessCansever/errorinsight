const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const { loadEnvConfig } = require('../config/env')

const env = loadEnvConfig()

const MIN_PASSWORD_LENGTH = 6
const PASSWORD_SALT_ROUNDS = 10

function normalizeEmail(value) {
  return String(value || '').trim().toLowerCase()
}

function isValidEmailFormat(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

function buildAuthResponse(user, token) {
  return {
    success: true,
    data: {
      token,
      user: {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
      },
    },
  }
}

function signAuthToken(user) {
  return jwt.sign(
    {
      id: user._id.toString(),
      email: user.email,
    },
    env.jwtSecret,
    {
      expiresIn: env.jwtExpiresIn,
    },
  )
}

async function register(req, res) {
  try {
    const name = String(req.body?.name || '').trim()
    const email = normalizeEmail(req.body?.email)
    const password = String(req.body?.password || '')

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        error: 'Ad, e-posta ve şifre alanları zorunludur.',
      })
    }

    if (!isValidEmailFormat(email)) {
      return res.status(400).json({
        success: false,
        error: 'Geçerli bir e-posta adresi girin.',
      })
    }

    if (password.length < MIN_PASSWORD_LENGTH) {
      return res.status(400).json({
        success: false,
        error: 'Şifre en az 6 karakter olmalıdır.',
      })
    }

    const existingUser = await User.findOne({ email })

    if (existingUser) {
      return res.status(409).json({
        success: false,
        error: 'Bu e-posta adresi zaten kayıtlı.',
      })
    }

    const passwordHash = await bcrypt.hash(password, PASSWORD_SALT_ROUNDS)

    const createdUser = await User.create({
      name,
      email,
      passwordHash,
    })

    const token = signAuthToken(createdUser)

    return res.status(201).json(buildAuthResponse(createdUser, token))
  } catch (error) {
    if (error?.code === 11000) {
      return res.status(409).json({
        success: false,
        error: 'Bu e-posta adresi zaten kayıtlı.',
      })
    }

    return res.status(500).json({
      success: false,
      error: 'Kayıt işlemi sırasında bir hata oluştu.',
    })
  }
}

async function login(req, res) {
  try {
    const email = normalizeEmail(req.body?.email)
    const password = String(req.body?.password || '')

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        error: 'E-posta ve şifre alanları zorunludur.',
      })
    }

    if (!isValidEmailFormat(email)) {
      return res.status(400).json({
        success: false,
        error: 'Geçerli bir e-posta adresi girin.',
      })
    }

    const user = await User.findOne({ email })

    if (!user) {
      return res.status(401).json({
        success: false,
        error: 'E-posta veya şifre hatalı.',
      })
    }

    const isPasswordValid = await bcrypt.compare(password, user.passwordHash)

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        error: 'E-posta veya şifre hatalı.',
      })
    }

    const token = signAuthToken(user)

    return res.status(200).json(buildAuthResponse(user, token))
  } catch {
    return res.status(500).json({
      success: false,
      error: 'Giriş işlemi sırasında bir hata oluştu.',
    })
  }
}

async function getCurrentUser(req, res) {
  try {
    const user = await User.findById(req.user.id).select('_id name email')

    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'Kullanıcı bulunamadı.',
      })
    }

    return res.status(200).json({
      success: true,
      data: {
        user: {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
        },
      },
    })
  } catch {
    return res.status(500).json({
      success: false,
      error: 'Kullanıcı bilgisi alınırken bir hata oluştu.',
    })
  }
}

module.exports = {
  register,
  login,
  getCurrentUser,
}
