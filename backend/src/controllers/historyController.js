const History = require('../models/History')

const DEFAULT_HISTORY_PAGE = 1
const DEFAULT_HISTORY_LIMIT = 8
const MAX_HISTORY_LIMIT = 24
const MAX_HISTORY_SEARCH_LENGTH = 120

const allowedCategories = new Set([
  'Type Error',
  'Reference Error',
  'Syntax Error',
  'React Error',
  'API / Network Error',
  'Build Tool Error',
  'Unknown',
])

const allowedSorts = new Set(['newest', 'oldest'])

function parsePositiveInteger(value, fallbackValue) {
  const parsedValue = Number.parseInt(value, 10)

  if (!Number.isInteger(parsedValue) || parsedValue < 1) {
    return fallbackValue
  }

  return parsedValue
}

function escapeRegex(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

function buildHistoryQuery({ userId, search, category }) {
  const query = {
    user: userId,
  }

  if (category) {
    query.category = category
  }

  if (search) {
    const escapedSearch = escapeRegex(search)

    query.$or = [
      { errorMessage: { $regex: escapedSearch, $options: 'i' } },
      { shortSummary: { $regex: escapedSearch, $options: 'i' } },
      { category: { $regex: escapedSearch, $options: 'i' } },
    ]
  }

  return query
}

async function getHistory(req, res) {
  try {
    const requestedPage = parsePositiveInteger(req.query.page, DEFAULT_HISTORY_PAGE)
    const requestedLimit = Math.min(
      parsePositiveInteger(req.query.limit, DEFAULT_HISTORY_LIMIT),
      MAX_HISTORY_LIMIT,
    )
    const rawSearch = typeof req.query.search === 'string' ? req.query.search.trim() : ''
    const rawCategory = typeof req.query.category === 'string' ? req.query.category.trim() : ''
    const rawSort = typeof req.query.sort === 'string' ? req.query.sort.trim().toLowerCase() : 'newest'

    if (rawSearch.length > MAX_HISTORY_SEARCH_LENGTH) {
      return res.status(400).json({
        success: false,
        error: `Arama metni en fazla ${MAX_HISTORY_SEARCH_LENGTH} karakter olabilir.`,
      })
    }

    if (rawCategory && !allowedCategories.has(rawCategory)) {
      return res.status(400).json({
        success: false,
        error: 'Geçersiz kategori filtresi.',
      })
    }

    const sort = allowedSorts.has(rawSort) ? rawSort : 'newest'
    const search = rawSearch
    const category = rawCategory
    const query = buildHistoryQuery({
      userId: req.user.id,
      search,
      category,
    })

    const totalItems = await History.countDocuments(query)
    const totalPages = totalItems > 0 ? Math.ceil(totalItems / requestedLimit) : 0
    const page = totalPages > 0 ? Math.min(requestedPage, totalPages) : DEFAULT_HISTORY_PAGE
    const sortQuery = sort === 'oldest' ? { createdAt: 1, _id: 1 } : { createdAt: -1, _id: -1 }

    const history = await History.find(query)
      .sort(sortQuery)
      .skip((page - 1) * requestedLimit)
      .limit(requestedLimit)
      .select('errorMessage codeSnippet category shortSummary createdAt')
      .lean()

    res.json({
      success: true,
      data: {
        items: history,
        pagination: {
          page,
          limit: requestedLimit,
          totalItems,
          totalPages,
          hasNextPage: page < totalPages,
          hasPrevPage: page > 1,
        },
        filters: {
          search,
          category,
          sort,
        },
      },
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
