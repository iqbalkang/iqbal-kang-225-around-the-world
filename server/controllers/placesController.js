const { StatusCodes } = require('http-status-codes')
const Place = require('../models/PlaceModel')
const Like = require('../models/LikeModel')
const Tag = require('../models/TagModel')
const AppError = require('../utils/appError')
const asyncHandler = require('express-async-handler')
const cloudinaryUpload = require('../utils/cloudinaryUpload')
const formatPlaces = require('../utils/formatPlaces')

// const getAllPlaces = catchAsync(async (req, res, next) => {
//   const signedInUser = req.params.id

//   const allPlaces = await Place.find({})
//   const favPlaces = await Favorite.find({})

//   const places = allPlaces.map(place => {
//     favPlaces.map(favPlace => {
//       if (place._id.toString() === favPlace.placeID.toString() && favPlace.addedBy.toString() === signedInUser) {
//         place.isFavorite = true
//       }
//     })
//     return place
//   })

//   res.status(StatusCodes.OK).json({
//     status: 'success',
//     places: allPlaces,
//   })
// })

// const getUserPlaces = catchAsync(async (req, res, next) => {
//   const signedInUser = req.params.userID

//   const userPlaces = await Place.find({ postedBy: signedInUser })
//   const favPlaces = await Favorite.find({ addedBy: signedInUser })

//   const places = userPlaces.map(userPlace => {
//     favPlaces.map(favPlace => {
//       if (userPlace._id.toString() === favPlace.placeID.toString()) {
//         userPlace.isFavorite = true
//       }
//     })
//     return userPlace
//   })

//   res.status(StatusCodes.OK).json({
//     status: 'success',
//     places,
//   })
// })

// const getUserFavorites = catchAsync(async (req, res, next) => {
//   const signedInUser = req.params.userID

//   // const places = await Favorite.find({ addedBy: signedInUser }).populate('placeID').select('-_id -__v -addedBy')
//   const places = await Favorite.find({ addedBy: signedInUser }).populate('placeID').select('-_id -__v -addedBy')

//   res.status(StatusCodes.OK).json({
//     status: 'success',
//     places,
//   })
// })

// const postUserPlace = catchAsync(async (req, res, next) => {
//   const signedInUser = req.params.userID

//   const { search: address, title, country, description, rating, coordinates, isFavorite } = req.body
//   if ((!address, !title, !country, !description)) return next(new AppError('Missing fields'), StatusCodes.BAD_REQUEST)

//   const place = await Place.create({
//     address,
//     title,
//     country,
//     description,
//     rating,
//     coordinates,
//     postedBy: signedInUser,
//     isFavorite,
//   })

//   res.status(StatusCodes.OK).json({
//     status: 'success',
//     place,
//   })
// })

// const postUserFavorite = catchAsync(async (req, res, next) => {
//   const signedInUser = req.user._id
//   const { placeID } = req.body

//   const favPlace = await Favorite.create({
//     addedBy: signedInUser,
//     placeID,
//   })

//   res.status(StatusCodes.OK).json({
//     status: 'success',
//     favPlace,
//   })
// })

// const deleteUserFavorite = catchAsync(async (req, res, next) => {
//   const signedInUser = req.user._id
//   const { placeID } = req.params

//   const deletedUserFavorite = await Favorite.findOneAndRemove({ placeID })
//   console.log(deletedUserFavorite)

//   // const favPlace = await Favorite.create({
//   //   addedBy: signedInUser,
//   //   placeID,
//   // })

//   res.status(StatusCodes.OK).json({
//     status: 'success',
//     deletedPlace: deletedUserFavorite,
//   })
// })

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
  console.log(req.query)

  let places
  if (signedInUser) await Place.findUserPlacesByUserIdAndSignedInUser(userId, signedInUser)
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

  if (likes) {
    place.likes = []
    likes.map(like => place.likes.push(like))
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
