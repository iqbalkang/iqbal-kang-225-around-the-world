const express = require('express')
const {
  getUserPlaces,
  postUserPlace,
  getAllPlaces,
  updatePlace,
  getUserFavorites,
  postUserFavorite,
  deleteUserFavorite,
  postPlace,
} = require('../controllers/placesController')
const isAuthenticated = require('../middlewares/isAuthenticated')
const uploadImage = require('../middlewares/upload')
// const isAuthenticated = require('../middlewares/isAuthenticated')

const router = express.Router()

router.get('/', getAllPlaces)
// router.post('/', isAuthenticated, postUserFavorite)
router.post('/', isAuthenticated, uploadImage.single('image'), postPlace)
// router.get('/favorites/:userID', isAuthenticated, getUserFavorites)
// router.get('/:userID', isAuthenticated, getUserPlaces)
// router.post('/:userID', isAuthenticated, postUserPlace)
// router.delete('/:placeID', isAuthenticated, deleteUserFavorite)
// router.patch('/:placeID', isAuthenticated, updatePlace)

module.exports = router
