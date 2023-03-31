const { StatusCodes } = require('http-status-codes')
const Place = require('../models/PlaceModel')
const AppError = require('../utils/appError')
const asyncHandler = require('express-async-handler')
const Comment = require('../models/commentModel')

const postComment = asyncHandler(async (req, res, next) => {
  const { id: userId } = req.user
  const { placeId, comment } = req.body

  if (!placeId) return next(new AppError('invalid request', StatusCodes.BAD_REQUEST))
  if (!comment) return next(new AppError('please enter a comment', StatusCodes.BAD_REQUEST))

  const newComment = new Comment(comment, placeId, userId)
  const savedComment = await newComment.save()

  res.status(StatusCodes.OK).json({
    status: 'success',
    message: 'comments was successfully posted',
    comment: savedComment,
  })
})

const getComments = asyncHandler(async (req, res, next) => {
  const { placeId } = req.params

  if (!placeId) return next(new AppError('invalid request', StatusCodes.BAD_REQUEST))

  const comments = await Comment.findByPlaceId(placeId)

  res.status(StatusCodes.OK).json({
    status: 'success',
    comments,
  })
})

module.exports = {
  postComment,
  getComments,
}
