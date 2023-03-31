const express = require('express')
const { StatusCodes } = require('http-status-codes')
const cors = require('cors')

const AppError = require('./utils/appError')
const errorHandler = require('./controllers/errorsController')
const userRouter = require('./routes/userRouter')
const placesRouter = require('./routes/placesRouter')
const commentsRouter = require('./routes/commentsRouter')

const app = express()

app.use(express.json())
app.use(cors())

app.use('/api/v1/authentication', userRouter)
app.use('/api/v1/places', placesRouter)
app.use('/api/v1/comments', commentsRouter)

app.use('*', (req, res, next) => {
  return next(new AppError(`Could not find ${req.originalUrl}`, StatusCodes.NOT_FOUND))
})

// global error handler
app.use(errorHandler)

module.exports = app
