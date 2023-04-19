const Alert = require('../models/AlertModel')

const sendAlert = async (req, alertFor, alertFrom, type, placeId, commentId) => {
  const newAlert = new Alert(alertFor, alertFrom, type, placeId, commentId)
  const alert = await newAlert.save()
  const alertData = await Alert.findById(alert.id)
  req.app.get('eventEmitter').emit('alert', { type, data: alertData })
}

module.exports = sendAlert
