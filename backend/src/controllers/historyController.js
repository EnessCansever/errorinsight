const History = require('../models/History')

async function getHistory(req, res) {
  try {
    const history = await History.find({ user: req.user.id })
      .sort({ createdAt: -1 })
      .select('errorMessage codeSnippet category shortSummary createdAt')

    res.json({
      success: true,
      data: history,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Geçmiş kayıtları getirilemedi.',
    })
  }
}

async function getHistoryById(req, res) {
  try {
    const item = await History.findOne({
      _id: req.params.id,
      user: req.user.id,
    })

    if (!item) {
      return res.status(404).json({
        success: false,
        error: 'Geçmiş kaydı bulunamadı.',
      })
    }

    res.json({
      success: true,
      data: item,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Kayit detayi getirilemedi.',
    })
  }
}

async function deleteHistoryById(req, res) {
  try {
    const deletedItem = await History.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    })

    if (!deletedItem) {
      return res.status(404).json({
        success: false,
        error: 'Silinecek geçmiş kaydı bulunamadı.',
      })
    }

    res.json({
      success: true,
      message: 'Geçmiş kaydı silindi.',
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Geçmiş kaydı silinemedi.',
    })
  }
}

async function submitHistoryFeedback(req, res) {
  try {
    const { id } = req.params
    const { feedbackType } = req.body

    if (feedbackType !== 'positive' && feedbackType !== 'negative') {
      return res.status(400).json({
        success: false,
        error: 'feedbackType sadece positive veya negative olabilir.',
      })
    }

    const updateField = feedbackType === 'positive' ? 'positiveFeedbackCount' : 'negativeFeedbackCount'

    const updatedItem = await History.findOneAndUpdate(
      {
        _id: id,
        user: req.user.id,
      },
      { $inc: { [updateField]: 1 } },
      { returnDocument: 'after', runValidators: true },
    ).select('_id positiveFeedbackCount negativeFeedbackCount')

    if (!updatedItem) {
      return res.status(404).json({
        success: false,
        error: 'Geçmiş kaydı bulunamadı.',
      })
    }

    return res.json({
      success: true,
      data: {
        id: updatedItem._id,
        positiveFeedbackCount: updatedItem.positiveFeedbackCount,
        negativeFeedbackCount: updatedItem.negativeFeedbackCount,
      },
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: 'Geri bildirim güncellenemedi.',
    })
  }
}

module.exports = {
  getHistory,
  getHistoryById,
  deleteHistoryById,
  submitHistoryFeedback,
}
