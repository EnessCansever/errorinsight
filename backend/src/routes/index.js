const express = require('express')
const authRoutes = require('./authRoutes')
const analyzeRoutes = require('./analyzeRoutes')
const historyRoutes = require('./historyRoutes')

const router = express.Router()

router.use(authRoutes)
router.use(analyzeRoutes)
router.use(historyRoutes)

module.exports = router
