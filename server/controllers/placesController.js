const { StatusCodes } = require('http-status-codes')
const Place = require('../models/PlaceModel')
const Like = require('../models/LikeModel')
const Tag = require('../models/TagModel')
const Alert = require('../models/AlertModel')
const Follow = require('../models/FollowModel')
const AppError = require('../utils/appError')
const asyncHandler = require('express-async-handler')
const cloudinaryUpload = require('../utils/cloudinaryUpload')
const formatPlaces = require('../utils/formatPlaces')
const formatUser = require('../utils/formatUser')

const postPlace = asyncHandler(async (req, res, next) => {
  const image = req.file
  const { title, description, country, lat, lng, rating, address, tags } = req.body
  const { id: userId } = req.user

  if (!address || !title || !country || !lat || !lng || !rating)
    return next(new AppError('Missing fields'), StatusCodes.BAD_REQUEST)

  let imageUrl = null
  let imageId = null

  if (image) {
    const { url, public_id } = await cloudinaryUpload(image.path)
    imageUrl = url
    imageId = public_id
  }

  const newPlace = new Place(userId, address, country, lat, lng, title, description, rating, imageUrl, imageId)
  const place = await newPlace.save()
  const placeId = place.id

  const followers = await Follow.getFollowers(userId)
  if (followers.length > 0) {
    followers.map(async follower => {
      const newAlert = new Alert(follower.id, userId, 'post', placeId)
      await newAlert.save()
    })
  }

  if (tags) {
    JSON.parse(tags).map(async tag => {
      const newTag = new Tag(tag, place.id)
      await newTag.save()
    })
  }

  res.status(StatusCodes.CREATED).json({
    status: 'success',
    message: 'new place added',
    place,
  })
})

const getAllPlaces = asyncHandler(async (req, res, next) => {
  const { user } = req.query

  let places
  if (user) places = await Place.findAllPlacesByUserId(user)
  else places = await Place.find()

  res.status(StatusCodes.OK).json({
    status: 'success',
    places: formatPlaces(places),
  })
})

const getUserPlaces = asyncHandler(async (req, res, next) => {
  const { userId } = req.params
  const { signedInUser } = req.query

  let places
  if (signedInUser) places = await Place.findUserPlacesByUserIdAndSignedInUser(userId, signedInUser)
  else places = await Place.findUserPlacesByUserId(userId)

  res.status(StatusCodes.OK).json({
    status: 'success',
    places: formatPlaces(places),
  })
})

const toggleLikedPlace = asyncHandler(async (req, res, next) => {
  const { id: userId } = req.user
  const { placeId } = req.params

  let response

  const like = await Like.findOne(userId, placeId)

  if (like) {
    await Like.findByIdAndDelete(userId, placeId)
  } else {
    const newLike = new Like(userId, placeId)
    response = await newLike.save()
  }

  res.status(StatusCodes.OK).json({
    status: 'success',
  })
})

const getUserFavorites = asyncHandler(async (req, res, next) => {
  const { id } = req.user

  const places = await Place.findUserFavorites(id)

  res.status(StatusCodes.OK).json({
    status: 'success',
    places: formatPlaces(places),
  })
})

const getSinglePlace = asyncHandler(async (req, res, next) => {
  const { placeId } = req.params
  const { user } = req.query

  if (!placeId) return next(new AppError('invalid request', StatusCodes.BAD_REQUEST))

  const place = await Place.findByPlaceId(placeId)
  const tags = await Place.findPlaceTags(placeId)
  const likes = await Place.findLikes(placeId)

  place.addedBy = place.first_name
  delete place.first_name

  place.userId = place.user_id
  delete place.user_id

  if (likes) {
    place.likes = []
    likes.map(like => {
      const formattedLike = formatUser(like)
      formattedLike.status = like.status
      place.likes.push(formattedLike)
    })
  }

  if (tags) {
    place.tags = []
    tags.map(tag => place.tags.push(tag.tag))
  }

  if (user) {
    let tempPlace
    tempPlace = await Place.findSinglePlaceByUserAndPlaceId(user, placeId)
    place.isFavorite = tempPlace.is_favorite
  }

  res.status(StatusCodes.OK).json({
    status: 'success',
    place,
  })
})

module.exports = {
  postPlace,
  getAllPlaces,
  toggleLikedPlace,
  getUserFavorites,
  getSinglePlace,
  getUserPlaces,
}
