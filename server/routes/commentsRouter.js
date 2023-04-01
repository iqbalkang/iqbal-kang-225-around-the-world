const express = require('express')
const {
  postComment,
  getComments,
  toggleCommentReaction,
  getCommentsForSignedInUsers,
} = require('../controllers/commentsController')

const isAuthenticated = require('../middlewares/isAuthenticated')

const router = express.Router()

router.get('/user/:placeId', isAuthenticated, getCommentsForSignedInUsers)
router.get('/:placeId', getComments)
router.post('/', isAuthenticated, postComment)
router.post('/reaction', isAuthenticated, toggleCommentReaction)

module.exports = router
