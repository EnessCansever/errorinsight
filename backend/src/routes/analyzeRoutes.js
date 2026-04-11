const express = require('express')
const { analyzeError } = require('../controllers/analyzeController')
const { analyzeRateLimiter } = require('../middlewares/rateLimiters')

const router = express.Router()

// Basit validation middleware
const validateAnalyzeRequest = (req, res, next) => {
  const { errorMessage } = req.body

  // Boş request kontrolü
  if (!errorMessage) {
    return res.status(400).json({
      success: false,
      error: 'errorMessage alanı gerekli.',
    })
  }

  // String kontrolü
  if (typeof errorMessage !== 'string') {
    return res.status(400).json({
      success: false,
      error: 'errorMessage bir string olmalı.',
    })
  }

  // Boşluk kontrolü
  if (errorMessage.trim().length === 0) {
    return res.status(400).json({
      success: false,
      error: 'errorMessage boş bırakılamaz.',
    })
  }

  // Max length kontrolü
  if (errorMessage.length > 5000) {
    return res.status(400).json({
      success: false,
      error: 'Hata mesajı çok uzun (max 5000 karakter).',
    })
  }

  next()
}

router.post('/analyze', analyzeRateLimiter, validateAnalyzeRequest, analyzeError)

module.exports = router
