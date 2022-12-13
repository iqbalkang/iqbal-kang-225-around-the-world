const { StatusCodes } = require('http-status-codes')
const AppError = require('../utils/appError')
const jwt = require('jsonwebtoken')
const catchAsync = require('./catchAsync')
const User = require('../models/userModel')

const isAuthenticated = catchAsync(async (req, res, next) => {
  const authHeader = req.headers.authorization

  if (!authHeader || !authHeader.startsWith('Bearer'))
    return next(new AppError('Not authorized to access the path', StatusCodes.UNAUTHORIZED))

  const token = authHeader.split(' ')[1]

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    const user = await User.findOne({ _id: decoded.id })
    req.user = user
  } catch (error) {
    return next(new AppError('Not authorized to access the path', StatusCodes.UNAUTHORIZED))
  }
  next()
})

module.exports = isAuthenticated
