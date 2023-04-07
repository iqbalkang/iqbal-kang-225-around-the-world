const express = require('express')

const {
  postFollowRequest,
  responseToFollowRequest,
  getFollowInfo,
  getFollowInfoForSignedInUsers,
} = require('../controllers/followersController')

const isAuthenticated = require('../middlewares/isAuthenticated')

const router = express.Router()

// router.get('/user/:placeId', isAuthenticated, getCommentsForSignedInUsers)
router.get('/:userId', getFollowInfo)
router.get('/auth/:userId', isAuthenticated, getFollowInfoForSignedInUsers)
router.post('/', isAuthenticated, postFollowRequest)
router.post('/response', isAuthenticated, responseToFollowRequest)
// router.post('/reaction', isAuthenticated, toggleCommentReaction)

module.exports = router
