const express = require('express')
const {
  getUserPlaces,
  postUserPlace,
  getAllPlaces,
  getSinglePlace,
  updatePlace,
  getUserFavorites,
  toggleLikedPlace,
  deleteUserFavorite,
  postPlace,
} = require('../controllers/placesController')
const isAuthenticated = require('../middlewares/isAuthenticated')
const uploadImage = require('../middlewares/upload')
// const isAuthenticated = require('../middlewares/isAuthenticated')

const router = express.Router()

router.get('/favorites', isAuthenticated, getUserFavorites)
router.get('/', getAllPlaces)
router.get('/user-places', isAuthenticated, getUserPlaces)
router.get('/:placeId', getSinglePlace)

router.post('/', isAuthenticated, uploadImage.single('image'), postPlace)
router.post('/like/:placeId', isAuthenticated, toggleLikedPlace)

// router.get('/favorites', (req, res) => console.log('ff'))
// router.get('/:userID', isAuthenticated, getUserPlaces)
// router.post('/:userID', isAuthenticated, postUserPlace)
// router.delete('/:placeID', isAuthenticated, deleteUserFavorite)
// router.patch('/:placeID', isAuthenticated, updatePlace)

module.exports = router
