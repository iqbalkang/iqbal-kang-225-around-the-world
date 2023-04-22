const express = require('express')
const {
  registerUser,
  loginUser,
  updateUser,
  getUserInfo,
  getAllUsers,
  getUserInfoForSignedInUsers,
  searchUsers,
} = require('../controllers/usersController')
const uploadImage = require('../middlewares/upload')
const isAuthenticated = require('../middlewares/isAuthenticated')

const router = express.Router()

router.post('/register', registerUser)
router.post('/login', loginUser)
router.patch('/update', isAuthenticated, uploadImage.single('image'), updateUser)
router.get('/user/:userId', getUserInfo)
router.get('/auth/user/:userId', isAuthenticated, getUserInfoForSignedInUsers)
router.get('/all-users', getAllUsers)
router.get('/search-users', searchUsers)

module.exports = router
