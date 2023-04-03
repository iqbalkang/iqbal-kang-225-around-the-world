const express = require('express')
const { getAlerts } = require('../controllers/alertsController')

const isAuthenticated = require('../middlewares/isAuthenticated')

const router = express.Router()

router.get('/', isAuthenticated, getAlerts)
// router.get('/:placeId', getComments)
// router.post('/', isAuthenticated, postComment)
// router.post('/reaction', isAuthenticated, toggleCommentReaction)

module.exports = router
