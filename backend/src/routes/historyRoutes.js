const express = require('express')
const {
	getHistory,
	getHistoryById,
	deleteHistoryById,
} = require('../controllers/historyController')

const router = express.Router()

router.get('/history', getHistory)
router.get('/history/:id', getHistoryById)
router.delete('/history/:id', deleteHistoryById)

module.exports = router
