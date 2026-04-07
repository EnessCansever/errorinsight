const mongoose = require('mongoose')

const historySchema = new mongoose.Schema(
  {
    errorMessage: {
      type: String,
      required: true,
      trim: true,
    },
    codeSnippet: {
      type: String,
      default: '',
    },
    category: {
      type: String,
      required: true,
    },
    shortSummary: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
)

module.exports = mongoose.model('History', historySchema)
