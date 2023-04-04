const { StatusCodes } = require('http-status-codes')
const AppError = require('../utils/appError')
const asyncHandler = require('express-async-handler')
const Alert = require('../models/AlertModel')

const getAlerts = asyncHandler(async (req, res, next) => {
  const { id: userId } = req.user

  const alerts = await Alert.findByUserId(userId)

  res.status(StatusCodes.OK).json({
    status: 'success',
    alerts,
  })
})

module.exports = {
  getAlerts,
}
