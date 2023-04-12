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
  getSimilarPlaces,
  getSimilarPlacesForSignedInUsers,
  deletePlace,
  editPlace,
} = require('../controllers/placesController')
const isAuthenticated = require('../middlewares/isAuthenticated')
const uploadImage = require('../middlewares/upload')
// const isAuthenticated = require('../middlewares/isAuthenticated')

const router = express.Router()

router.get('/favorites', isAuthenticated, getUserFavorites)
router.get('/', getAllPlaces)
router.get('/user-places/:userId', getUserPlaces)
router.get('/:placeId', getSinglePlace)
router.get('/auth/similar/:placeId', isAuthenticated, getSimilarPlacesForSignedInUsers)
router.get('/similar/:placeId', getSimilarPlaces)

router.post('/', isAuthenticated, uploadImage.single('image'), postPlace)
router.post('/like/:placeId', isAuthenticated, toggleLikedPlace)

router.patch('/:placeId', isAuthenticated, uploadImage.single('image'), editPlace)

router.delete('/:placeId', isAuthenticated, deletePlace)

module.exports = router
