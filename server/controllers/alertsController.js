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

const deleteAlerts = asyncHandler(async (req, res, next) => {
  const { id: userId } = req.user

  await Alert.deleteAll(userId)

  res.status(StatusCodes.OK).json({
    status: 'success',
  })
})

const deleteSingleAlert = asyncHandler(async (req, res, next) => {
  const { id: userId } = req.user
  const { placeId } = req.params

  await Alert.deletePostAlert(userId, placeId)

  res.status(StatusCodes.OK).json({
    status: 'success',
  })
})

module.exports = {
  getAlerts,
  deleteAlerts,
  deleteSingleAlert,
}
