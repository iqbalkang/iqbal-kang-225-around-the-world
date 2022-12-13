const catchAsync = require('../utils/catchAsync')
const Place = require('../models/placeModel')
const { StatusCodes } = require('http-status-codes')
const AppError = require('../utils/appError')

const getAllPlaces = catchAsync(async (req, res, next) => {
  const places = await Place.find({})

  res.status(StatusCodes.OK).json({
    status: 'success',
    places,
  })
})

const getUserPlaces = catchAsync(async (req, res, next) => {
  const signedInUser = req.user

  const places = await Place.find({ postedBy: signedInUser._id })

  res.status(StatusCodes.OK).json({
    status: 'success',
    places,
  })
})

const postUserPlace = catchAsync(async (req, res, next) => {
  const signedInUser = req.user

  const { search: address, title, country, description, rating, coordinates } = req.body
  if ((!address, !title, !country, !description)) return next(new AppError('Missing fields'), StatusCodes.BAD_REQUEST)

  const place = await Place.create({
    address,
    title,
    country,
    description,
    rating,
    coordinates,
    postedBy: signedInUser._id,
  })

  res.status(StatusCodes.OK).json({
    status: 'success',
    place,
  })
})

module.exports = {
  getUserPlaces,
  postUserPlace,
  getAllPlaces,
}
