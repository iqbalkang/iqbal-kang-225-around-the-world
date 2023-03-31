const express = require('express')
const { postComment, getComments } = require('../controllers/commentsController')

const isAuthenticated = require('../middlewares/isAuthenticated')

const router = express.Router()

router.get('/:placeId', getComments)
router.post('/', isAuthenticated, postComment)

module.exports = router
