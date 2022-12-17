const catchAsync = require('../utils/catchAsync')
const Place = require('../models/placeModel')
const Favorite = require('../models/favoriteModel')
const { StatusCodes } = require('http-status-codes')
const AppError = require('../utils/appError')
const { default: mongoose } = require('mongoose')

const getAllPlaces = catchAsync(async (req, res, next) => {
  const signedInUser = req.params.id

  const allPlaces = await Place.find({})
  const favPlaces = await Favorite.find({})

  const places = allPlaces.map(place => {
    favPlaces.map(favPlace => {
      if (place._id.toString() === favPlace.placeID.toString() && favPlace.addedBy.toString() === signedInUser) {
        place.isFavorite = true
      }
    })
    return place
  })

  res.status(StatusCodes.OK).json({
    status: 'success',
    places: allPlaces,
  })
})

const getUserPlaces = catchAsync(async (req, res, next) => {
  const signedInUser = req.params.userID

  const userPlaces = await Place.find({ postedBy: signedInUser })
  const favPlaces = await Favorite.find({ addedBy: signedInUser })

  const places = userPlaces.map(userPlace => {
    favPlaces.map(favPlace => {
      if (userPlace._id.toString() === favPlace.placeID.toString()) {
        userPlace.isFavorite = true
      }
    })
    return userPlace
  })

  res.status(StatusCodes.OK).json({
    status: 'success',
    places,
  })
})

const getUserFavorites = catchAsync(async (req, res, next) => {
  const signedInUser = req.params.userID

  // const places = await Favorite.find({ addedBy: signedInUser }).populate('placeID').select('-_id -__v -addedBy')
  const places = await Favorite.find({ addedBy: signedInUser }).populate('placeID').select('-_id -__v -addedBy')

  res.status(StatusCodes.OK).json({
    status: 'success',
    places,
  })
})

const postUserPlace = catchAsync(async (req, res, next) => {
  const signedInUser = req.params.userID

  const { search: address, title, country, description, rating, coordinates, isFavorite } = req.body
  if ((!address, !title, !country, !description)) return next(new AppError('Missing fields'), StatusCodes.BAD_REQUEST)

  const place = await Place.create({
    address,
    title,
    country,
    description,
    rating,
    coordinates,
    postedBy: signedInUser,
    isFavorite,
  })

  res.status(StatusCodes.OK).json({
    status: 'success',
    place,
  })
})

const postUserFavorite = catchAsync(async (req, res, next) => {
  const signedInUser = req.user._id
  const { placeID } = req.body

  const favPlace = await Favorite.create({
    addedBy: signedInUser,
    placeID,
  })

  res.status(StatusCodes.OK).json({
    status: 'success',
    favPlace,
  })
})

const deleteUserFavorite = catchAsync(async (req, res, next) => {
  const signedInUser = req.user._id
  const { placeID } = req.params

  const deletedUserFavorite = await Favorite.findOneAndRemove({ placeID })
  console.log(deletedUserFavorite)

  // const favPlace = await Favorite.create({
  //   addedBy: signedInUser,
  //   placeID,
  // })

  res.status(StatusCodes.OK).json({
    status: 'success',
    deletedPlace: deletedUserFavorite,
  })
})

module.exports = {
  getUserPlaces,
  postUserPlace,
  getAllPlaces,
  postUserFavorite,
  deleteUserFavorite,
  getUserFavorites,
}
