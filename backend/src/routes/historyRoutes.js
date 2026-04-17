const express = require('express')
const { requireAuth } = require('../middlewares/requireAuth')
const {
	getHistory,
	getHistoryById,
	deleteHistoryById,
	submitHistoryFeedback,
} = require('../controllers/historyController')

const router = express.Router()

router.get('/history', requireAuth, getHistory)
router.get('/history/:id', requireAuth, getHistoryById)
router.delete('/history/:id', requireAuth, deleteHistoryById)
router.post('/history/:id/feedback', requireAuth, submitHistoryFeedback)

module.exports = router
