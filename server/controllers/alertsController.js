const { StatusCodes } = require('http-status-codes')
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
  const { alertId } = req.params

  await Alert.deleteAlert(userId, alertId)

  res.status(StatusCodes.OK).json({
    status: 'success',
  })
})

module.exports = {
  getAlerts,
  deleteAlerts,
  deleteSingleAlert,
}
