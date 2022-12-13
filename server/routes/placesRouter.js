const express = require('express')
const { getUserPlaces, postUserPlace, getAllPlaces } = require('../controllers/placesController')
const isAuthenticated = require('../utils/isAuthenticated')

const router = express.Router()

router.get('/allPlaces', getAllPlaces)
router.get('/', isAuthenticated, getUserPlaces)
router.post('/', isAuthenticated, postUserPlace)

module.exports = router
