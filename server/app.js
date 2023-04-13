const express = require('express')
const { StatusCodes } = require('http-status-codes')
const cors = require('cors')
const app = express()
const httpServer = require('http').createServer(app)
const fs = require('fs')

const AppError = require('./utils/appError')
const errorHandler = require('./controllers/errorsController')
const userRouter = require('./routes/userRouter')
const placesRouter = require('./routes/placesRouter')
const commentsRouter = require('./routes/commentsRouter')
const repliesRouter = require('./routes/repliesRouter')
const followersRouter = require('./routes/followersRouter')
const alertsRouter = require('./routes/alertsRouter')
const sseRouter = require('./routes/sseRouter')

app.use(express.json())
app.use(cors())

app.use('/api/v1/authentication', userRouter)
app.use('/api/v1/places', placesRouter)
app.use('/api/v1/comments', commentsRouter)
app.use('/api/v1/reply', repliesRouter)
app.use('/api/v1/follow', followersRouter)
app.use('/api/v1/alerts', alertsRouter)
app.use('/api/v1/sse', sseRouter)

app.use('*', (req, res, next) => {
  return next(new AppError(`Could not find ${req.originalUrl}`, StatusCodes.NOT_FOUND))
})

// global error handler
app.use(errorHandler)

const EventEmitter = require("events");
const eventEmitter = new EventEmitter();
app.set("eventEmitter", eventEmitter);

module.exports = httpServer
