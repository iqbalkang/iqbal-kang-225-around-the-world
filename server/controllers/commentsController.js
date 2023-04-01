const { StatusCodes } = require('http-status-codes')
const AppError = require('../utils/appError')
const asyncHandler = require('express-async-handler')
const Place = require('../models/PlaceModel')
const Comment = require('../models/CommentModel')
const Reaction = require('../models/ReactionModel')

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

const getCommentsForSignedInUsers = asyncHandler(async (req, res, next) => {
  const { placeId } = req.params
  const { id: userId } = req.user

  if (!placeId) return next(new AppError('invalid request', StatusCodes.BAD_REQUEST))

  const comments = await Comment.findByPlaceAndUserId(placeId, userId)

  res.status(StatusCodes.OK).json({
    status: 'success',
    comments,
  })
})

const toggleCommentReaction = asyncHandler(async (req, res, next) => {
  const { id: userId } = req.user
  // const { commentId } = req.params
  const { type, commentId } = req.body

  const reaction = await Reaction.findOne(userId, commentId)

  if (reaction && reaction.type === type) {
    await Reaction.findByIdAndDelete(userId, commentId)
  }

  if (!reaction) {
    const newReaction = new Reaction(type, commentId, userId)
    await newReaction.save()
  }

  if (reaction && reaction.type !== type) {
    await Reaction.findByIdAndDelete(userId, commentId)
    const newReaction = new Reaction(type, commentId, userId)
    await newReaction.save()
  }

  res.status(StatusCodes.OK).json({
    status: 'success',
  })
})

module.exports = {
  postComment,
  getComments,
  toggleCommentReaction,
  getCommentsForSignedInUsers,
}
