const analyzeService = require('../services/analyzeService')

async function analyzeError(req, res) {
  try {
    const { errorMessage, codeSnippet } = req.body

    // Validation zaten route middleware'de yapılıyor, ama ekstra kontrol
    if (!errorMessage || errorMessage.trim().length === 0) {
      return res.status(400).json({
        success: false,
        error: 'Hata mesajı boş bırakılamaz.',
      })
    }

    // Service'den analiz isteyelim
    const analysis = await analyzeService.analyzeError(errorMessage, codeSnippet)

    res.json({
      success: true,
      data: analysis,
    })
  } catch (error) {
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
