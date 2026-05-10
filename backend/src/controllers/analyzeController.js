const analyzeService = require('../services/analyzeService')
const History = require('../models/History')

const REUSE_LOOKUP_LIMIT = 40

function getShortUserTag(userId) {
  if (!userId) {
    return 'anonymous'
  }

  const value = String(userId).trim()
  if (!value) {
    return 'anonymous'
  }

  if (value.length <= 8) {
    return value
  }

  return `${value.slice(0, 4)}...${value.slice(-4)}`
}

function getElapsedMs(startTime) {
  return Number(process.hrtime.bigint() - startTime) / 1e6
}

function formatMs(value) {
  return Math.round(value)
}

function normalizeForMatch(value) {
  if (typeof value !== 'string') {
    return ''
  }

  return value.trim().replace(/\s+/g, ' ').toLowerCase()
}

function buildReusableAnalysis(historyRecord) {
  if (!historyRecord) {
    return null
  }

  if (!historyRecord.turkishExplanation || !historyRecord.notes) {
    return null
  }

  return {
    category: historyRecord.category,
    shortSummary: historyRecord.shortSummary,
    turkishExplanation: historyRecord.turkishExplanation,
    possibleCauses: Array.isArray(historyRecord.possibleCauses) ? historyRecord.possibleCauses : [],
    solutionSteps: Array.isArray(historyRecord.solutionSteps) ? historyRecord.solutionSteps : [],
    exampleFixCode: historyRecord.exampleFixCode || '',
    notes: historyRecord.notes,
    seoContent: historyRecord.seoContent || '',
  }
}

function buildSeoContentFallback(shortSummary, errorMessage) {
  const summaryText = typeof shortSummary === 'string' ? shortSummary.trim() : ''
  const errorText = typeof errorMessage === 'string' ? errorMessage.trim() : ''

  if (summaryText) {
    return `${summaryText} Bu hata genellikle beklenmeyen veri veya akış uyumsuzluğu nedeniyle ortaya çıkar. Hatanın oluştuğu noktadaki veri tipini ve koşulları adım adım kontrol etmek çözüm sürecini hızlandırır. Benzer sorunları azaltmak için koruyucu kontroller ve açık durum yönetimi eklenmelidir.`
  }

  if (errorText) {
    const shortenedError = errorText.length > 120 ? `${errorText.slice(0, 120).trimEnd()}...` : errorText
    return `${shortenedError} mesajı, kodun beklenmeyen bir durumda çalıştığını gösterir. Sorunun kaynağını bulmak için hataya giden veri akışlarını ve ilgili satırdaki koşulları inceleyin. Kalıcı çözüm için giriş doğrulaması ve güvenli kontrol adımları ekleyin.`
  }

  return 'Bu hata, uygulamanın beklenmeyen bir veri veya çalışma durumuyla karşılaştığını gösterir. Sorunun kaynağını bulmak için ilgili kod akışını adım adım inceleyin. Benzer hataların tekrarını azaltmak için doğrulama ve koruyucu kontroller uygulayın.'
}

async function findReusableAnalysis(userId, errorMessage, codeSnippet) {
  const normalizedError = normalizeForMatch(errorMessage)
  const normalizedSnippet = normalizeForMatch(codeSnippet)

  if (!normalizedError) {
    return null
  }

  const candidates = await History.find({
    user: userId,
    errorMessage: { $exists: true },
  })
    .sort({ createdAt: -1 })
    .limit(REUSE_LOOKUP_LIMIT)
    .lean()

  const matchedRecord = candidates.find((candidate) => {
    const candidateError = normalizeForMatch(candidate.errorMessage)
    const candidateSnippet = normalizeForMatch(candidate.codeSnippet)

    if (candidateError !== normalizedError) {
      return false
    }

    if (normalizedSnippet) {
      return candidateSnippet === normalizedSnippet
    }

    return !candidateSnippet
  })

  return buildReusableAnalysis(matchedRecord)
}

async function analyzeError(req, res) {
  const requestStart = process.hrtime.bigint()
  const userTag = getShortUserTag(req.user?.id)

  try {
    const userId = req.user?.id
    const { errorMessage, codeSnippet } = req.body

    if (!userId) {
      return res.status(401).json({
        success: false,
        error: 'Bu işlem için giriş yapmanız gerekiyor.',
      })
    }

    // Validation zaten route middleware'de yapılıyor, ama ekstra kontrol
    if (!errorMessage || errorMessage.trim().length === 0) {
      return res.status(400).json({
        success: false,
        error: 'Hata mesajı boş bırakılamaz.',
      })
    }

    let analysis = null
    let cacheHit = false
    let duplicateCheckMs = 0

    const duplicateCheckStart = process.hrtime.bigint()

    try {
      const reusableAnalysis = await findReusableAnalysis(userId, errorMessage, codeSnippet)
      if (reusableAnalysis) {
        analysis = reusableAnalysis
        cacheHit = true
      }
    } catch (reuseError) {
      console.warn('[analyze] Tekrar kullanim kontrolu basarisiz:', reuseError.message)
    } finally {
      duplicateCheckMs = getElapsedMs(duplicateCheckStart)
      console.info(
        `[analyze] duplicate_check user=${userTag} cacheHit=${cacheHit} duration_ms=${formatMs(duplicateCheckMs)}`,
      )
    }

    if (!analysis) {
      analysis = await analyzeService.analyzeError(errorMessage, codeSnippet)
    }

    const responsePrepStart = process.hrtime.bigint()
    const resolvedSeoContent =
      typeof analysis.seoContent === 'string' && analysis.seoContent.trim()
        ? analysis.seoContent.trim()
        : buildSeoContentFallback(analysis.shortSummary, errorMessage)

    analysis = {
      ...analysis,
      seoContent: resolvedSeoContent,
    }
    const responsePrepMs = getElapsedMs(responsePrepStart)

    let historyId = null
    let historySaveMs = 0

    // Analiz sonucu olusunca gecmise kaydet (kayit hatasi analiz akisini bozmaz)
    try {
      const historySaveStart = process.hrtime.bigint()
      const createdHistory = await History.create({
        user: userId,
        errorMessage,
        codeSnippet: codeSnippet || '',
        category: analysis.category,
        shortSummary: analysis.shortSummary,
        turkishExplanation: analysis.turkishExplanation || '',
        possibleCauses: Array.isArray(analysis.possibleCauses) ? analysis.possibleCauses : [],
        solutionSteps: Array.isArray(analysis.solutionSteps) ? analysis.solutionSteps : [],
        exampleFixCode: analysis.exampleFixCode || '',
        notes: analysis.notes || '',
        seoContent: analysis.seoContent || '',
      })

      historyId = createdHistory._id?.toString() || null
      historySaveMs = getElapsedMs(historySaveStart)
    } catch (historyError) {
      console.warn('[history] Kayit olusturulamadi:', historyError.message)
    }

    const analysisSource = cacheHit ? 'cache' : analysis.usedFallback ? 'fallback' : 'gemini'
    const totalMs = getElapsedMs(requestStart)

    console.info(
      `[analyze] total user=${userTag} source=${analysisSource} cacheHit=${cacheHit} total_ms=${formatMs(totalMs)} duplicate_check_ms=${formatMs(duplicateCheckMs)} save_ms=${formatMs(historySaveMs)} prep_ms=${formatMs(responsePrepMs)} result=success`,
    )

    res.json({
      success: true,
      data: {
        ...analysis,
        historyId,
      },
    })
  } catch (error) {
    const totalMs = getElapsedMs(requestStart)
    const userTag = getShortUserTag(req.user?.id)

    console.error(
      `[analyze] total user=${userTag} total_ms=${formatMs(totalMs)} result=error`,
    )
    console.error('Analyze controller hatası:', error)
    res.status(500).json({
      success: false,
      error: 'Analiz sırasında bir hata oluştu.',
    })
  }
}

module.exports = {
  analyzeError,
}
