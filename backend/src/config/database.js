const mongoose = require('mongoose')

mongoose.set('bufferCommands', false)

async function connectDatabase() {
  const mongoUri = process.env.MONGODB_URI

  if (!mongoUri) {
    console.warn('[database] MONGODB_URI tanimli degil. Gecmis kayitlari calismayacak.')
    return
  }

  try {
    await mongoose.connect(mongoUri)
    console.log('[database] MongoDB baglantisi basarili.')
  } catch (error) {
    console.error('[database] MongoDB baglanti hatasi:', error.message)
  }
}

module.exports = {
  connectDatabase,
}
