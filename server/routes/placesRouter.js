const express = require('express')
const {
  getUserPlaces,
  postUserPlace,
  getAllPlaces,
  updatePlace,
  getUserFavorites,
  postUserFavorite,
  deleteUserFavorite,
} = require('../controllers/placesController')
const isAuthenticated = require('../utils/isAuthenticated')

const router = express.Router()

router.get('/all/:id', getAllPlaces)
router.post('/favorite', isAuthenticated, postUserFavorite)
router.get('/favorites/:userID', isAuthenticated, getUserFavorites)
router.get('/:userID', isAuthenticated, getUserPlaces)
router.post('/:userID', isAuthenticated, postUserPlace)
router.delete('/:placeID', isAuthenticated, deleteUserFavorite)
// router.patch('/:placeID', isAuthenticated, updatePlace)

module.exports = router
