const express = require('express')
const analyzeRoutes = require('./analyzeRoutes')
const historyRoutes = require('./historyRoutes')

const router = express.Router()

router.use(analyzeRoutes)
router.use(historyRoutes)

module.exports = router
