const mongoose = require('mongoose')

mongoose.set('bufferCommands', false)

async function connectDatabase(mongoUri) {
  const targetUri = mongoUri || process.env.MONGODB_URI

  if (!targetUri) {
    throw new Error('[database] MONGODB_URI tanimli degil.')
  }

  try {
    await mongoose.connect(targetUri)
    console.log('[database] MongoDB baglantisi basarili.')
  } catch (error) {
    console.error('[database] MongoDB baglanti hatasi:', error.message)
    throw error
  }
}

module.exports = {
  connectDatabase,
}
