const express = require('express')
const {
  postComment,
  getComments,
  toggleCommentReaction,
  getCommentsForSignedInUsers,
  deleteComment,
  editComment,
} = require('../controllers/commentsController')

const isAuthenticated = require('../middlewares/isAuthenticated')

const router = express.Router()

router.get('/user/:placeId', isAuthenticated, getCommentsForSignedInUsers)
router.get('/:placeId', getComments)
router.post('/', isAuthenticated, postComment)
router.post('/reaction', isAuthenticated, toggleCommentReaction)
router.delete('/:commentId', isAuthenticated, deleteComment)
router.patch('/:commentId', isAuthenticated, editComment)

module.exports = router
