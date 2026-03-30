function getHistory(req, res) {
  res.json({
    success: true,
    data: [],
    message: 'Gecmis ozelligi henuz baglanmadi.',
  })
}

module.exports = {
  getHistory,
}
