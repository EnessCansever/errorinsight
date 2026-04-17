const express = require('express')
const { register, login, getCurrentUser } = require('../controllers/authController')
const { requireAuth } = require('../middlewares/requireAuth')

const router = express.Router()

router.post('/auth/register', register)
router.post('/auth/login', login)
router.get('/auth/me', requireAuth, getCurrentUser)

module.exports = router
