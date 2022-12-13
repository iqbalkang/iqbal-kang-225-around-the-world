const app = require('./app')
const mongoose = require('mongoose')
require('dotenv').config()

const MONGOURI = process.env.MONGO_URI
const PORT = process.env.PORT || 8000

mongoose.set('strictQuery', false)

const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log('Connected to database.')
  } catch (error) {
    console.log(error.message)
  }
  app.listen(PORT, () => console.log('Listening on ' + PORT + '...'))
}

startServer()
