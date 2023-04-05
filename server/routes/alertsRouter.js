const express = require('express')
const { getAlerts, deleteAlerts, deleteSingleAlert } = require('../controllers/alertsController')

const isAuthenticated = require('../middlewares/isAuthenticated')

const router = express.Router()

router.get('/', isAuthenticated, getAlerts)
router.delete('/', isAuthenticated, deleteAlerts)
router.delete('/:placeId', isAuthenticated, deleteSingleAlert)
// router.post('/', isAuthenticated, postComment)
// router.post('/reaction', isAuthenticated, toggleCommentReaction)

module.exports = router
