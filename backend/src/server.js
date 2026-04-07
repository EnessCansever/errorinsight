const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const apiRoutes = require('./routes')
const { connectDatabase } = require('./config/database')

dotenv.config()
connectDatabase()

const app = express()
const PORT = process.env.PORT || 3001

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.json({ message: 'ErrorInsight backend ayakta.' })
})

app.use('/api', apiRoutes)

app.listen(PORT, () => {
  console.log(`Server calisiyor: http://localhost:${PORT}`)
})
