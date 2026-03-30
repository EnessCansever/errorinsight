function analyzeError(req, res) {
  const { errorMessage } = req.body

  res.json({
    success: true,
    message: 'Analiz iskeleti hazir. Gercek AI entegrasyonu daha sonra eklenecek.',
    input: errorMessage || null,
  })
}

module.exports = {
  analyzeError,
}
