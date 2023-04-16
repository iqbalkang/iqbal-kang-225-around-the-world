const { StatusCodes } = require('http-status-codes')
const Place = require('../models/placeModel')
const Like = require('../models/LikeModel')
const Tag = require('../models/TagModel')
const Alert = require('../models/AlertModel')
const Follow = require('../models/FollowModel')
const AppError = require('../utils/appError')
const asyncHandler = require('express-async-handler')
const cloudinaryUpload = require('../utils/cloudinaryUpload')
const cloudinary = require('cloudinary').v2
const formatPlaces = require('../utils/formatPlaces')
const formatUser = require('../utils/formatUser')

const postPlace = asyncHandler(async (req, res, next) => {
  const image = req.file
  const { title, description, country, lat, lng, rating, address, tags } = req.body
  const { id: userId } = req.user

  if (!address || !title || !country || !lat || !lng || !rating)
    return next(new AppError('Missing fields'), StatusCodes.BAD_REQUEST)

  let imageUrl = null
  let smallImageUrl = null
  let imageId = null

  if (image) {
    const { url, public_id, responsive_breakpoints } = await cloudinary.uploader.upload(image.path, {
      transformation: { width: 1280, height: 720 },
      responsive_breakpoints: {
        create_derived: true,
        max_width: 640,
        max_height: 480,
        max_images: 1,
      },
    })
    imageUrl = url
    imageId = public_id
    console.log(responsive_breakpoints.breakpoints)
    smallImageUrl = responsive_breakpoints[0].breakpoints[0].url
  }

  const newPlace = new Place(
    userId,
    address,
    country,
    lat,
    lng,
    title,
    description,
    rating,
    imageUrl,
    smallImageUrl,
    imageId
  )

  const place = await newPlace.save()
  const placeId = place.id

  const followers = await Follow.getFollowers(userId)
  if (followers.length > 0) {
    await Promise.all(
      followers.map(async follower => {
        const newAlert = new Alert(follower.id, userId, 'post', placeId)
        const alert = await newAlert.save()
        const alertData = await Alert.findById(alert.id)
        req.app.get('eventEmitter').emit('alert', { type: 'post', data: alertData })
      })
    )
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
  const { user, page, limit } = req.query

  const skip = +page * +limit

  let places
  if (user) places = await Place.findAllPlacesByUserId(user, skip, limit)
  else places = await Place.find(skip, limit)

  res.status(StatusCodes.OK).json({
    status: 'success',
    places: formatPlaces(places),
  })
})

const getUserPlaces = asyncHandler(async (req, res, next) => {
  const { userId } = req.params
  const { signedInUser, page, limit } = req.query

  const skip = +page * +limit

  let places
  if (signedInUser) places = await Place.findUserPlacesByUserIdAndSignedInUser(userId, signedInUser, skip, limit)
  else places = await Place.findUserPlacesByUserId(userId, skip, limit)

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
  const { page, limit } = req.query

  const skip = +page * +limit

  const places = await Place.findUserFavorites(id, skip, limit)

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

  let likes
  if (user) likes = await Place.findLikesForSignedInUser(placeId, user)
  else likes = await Place.findLikes(placeId)

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

const getSimilarPlacesForSignedInUsers = asyncHandler(async (req, res, next) => {
  const { placeId } = req.params
  const { id: userId } = req.user

  if (!placeId) return next(new AppError('invalid request', StatusCodes.BAD_REQUEST))

  const places = await Place.findSimilarForSignedInUsers(placeId, userId)

  res.status(StatusCodes.OK).json({
    status: 'success',
    places: formatPlaces(places),
  })
})

const getSimilarPlaces = asyncHandler(async (req, res, next) => {
  const { placeId } = req.params

  if (!placeId) return next(new AppError('invalid request', StatusCodes.BAD_REQUEST))

  const places = await Place.findSimilarPlaces(placeId)

  res.status(StatusCodes.OK).json({
    status: 'success',
    places: formatPlaces(places),
  })
})

const deletePlace = asyncHandler(async (req, res, next) => {
  const { placeId } = req.params

  const place = await Place.findByPlaceId(placeId)
  const tags = await Place.findPlaceTags(placeId)

  if (!place) return next(new AppError('No place was found', StatusCodes.NOT_FOUND))

  const { image_id } = place
  if (image_id) {
    const { result } = await cloudinary.uploader.destroy(image_id)
    // if (result !== 'ok') return next(new AppError('Could not delete the image from cloud.', StatusCodes.NOT_MODIFIED))
  }

  if (tags.length) {
    tags.map(async tag => await Tag.findByIdAndDelete(placeId))
  }

  await Place.findByIdAndDelete(placeId)

  res.status(StatusCodes.OK).json({
    status: 'success',
    message: 'Place deleted successfully',
  })
})

const editPlace = asyncHandler(async (req, res, next) => {
  const image = req.file
  const { title, description, country, lat, lng, rating, address, tags, id: placeId } = req.body
  const { id: userId } = req.user

  if (!address || !title || !country || !lat || !lng || !rating)
    return next(new AppError('Missing fields'), StatusCodes.BAD_REQUEST)

  let imageUrl = null
  let imageId = null
  const oldPlace = await Place.findByPlaceId(placeId)
  const oldImageId = oldPlace?.image_id

  if (image && oldImageId) {
    const { result } = await cloudinary.uploader.destroy(oldImageId)
    if (result !== 'ok') return next(new AppError('Could not delete the image from cloud.', StatusCodes.NOT_MODIFIED))
  }

  if (image) {
    const { url, public_id } = await cloudinaryUpload(image.path)
    imageUrl = url
    imageId = public_id
  }

  if (!imageUrl) imageUrl = oldPlace.image
  if (!imageId) imageId = oldPlace.image_id

  const newPlace = new Place(userId, address, country, lat, lng, title, description, rating, imageUrl, imageId)
  const place = await newPlace.updateOne(placeId)

  if (tags) {
    place.tags = []
    await Tag.findByIdAndDelete(placeId)
    JSON.parse(tags).map(async tag => {
      place.tags.push(tag)
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

module.exports = {
  postPlace,
  getAllPlaces,
  toggleLikedPlace,
  getUserFavorites,
  getSinglePlace,
  getUserPlaces,
  getSimilarPlacesForSignedInUsers,
  getSimilarPlaces,
  deletePlace,
  editPlace,
}
