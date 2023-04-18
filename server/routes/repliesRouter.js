const express = require('express')

const { postReply, getReplies, deleteReply, editReply } = require('../controllers/repliesController')

const isAuthenticated = require('../middlewares/isAuthenticated')

const router = express.Router()

// router.get('/user/:placeId', isAuthenticated, getCommentsForSignedInUsers)
router.get('/:commentId', getReplies)
router.post('/', isAuthenticated, postReply)
router.delete('/:replyId', isAuthenticated, deleteReply)
router.patch('/:replyId', isAuthenticated, editReply)
// router.post('/reaction', isAuthenticated, toggleCommentReaction)

module.exports = router
