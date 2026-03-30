const express = require('express')
const { analyzeError } = require('../controllers/analyzeController')

const router = express.Router()

router.post('/analyze', analyzeError)

module.exports = router
