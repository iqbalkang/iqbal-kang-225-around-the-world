const express = require('express')
const { registerUser, loginUser, updateUser, getUserInfo, getAllUsers } = require('../controllers/usersController')
const uploadImage = require('../middlewares/upload')
const isAuthenticated = require('../middlewares/isAuthenticated')

const router = express.Router()

router.post('/register', registerUser)
router.post('/login', loginUser)
router.put('/update', isAuthenticated, uploadImage.single('image'), updateUser)
router.get('/user/:userId', getUserInfo)
router.get('/all-users', getAllUsers)

module.exports = router
