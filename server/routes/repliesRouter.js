const express = require('express')

const { postReply } = require('../controllers/repliesController')

const isAuthenticated = require('../middlewares/isAuthenticated')

const router = express.Router()

// router.get('/user/:placeId', isAuthenticated, getCommentsForSignedInUsers)
// router.get('/:placeId', getComments)
router.post('/', isAuthenticated, postReply)
// router.post('/reaction', isAuthenticated, toggleCommentReaction)

module.exports = router
