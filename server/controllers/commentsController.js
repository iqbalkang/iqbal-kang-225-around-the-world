const { StatusCodes } = require('http-status-codes')
const AppError = require('../utils/AppError')
const asyncHandler = require('express-async-handler')
const Comment = require('../models/CommentModel')
const Reaction = require('../models/ReactionModel')
const Alert = require('../models/AlertModel')
const Place = require('../models/PlaceModel')
const sendAlert = require('../utils/sendAlert')

const postComment = asyncHandler(async (req, res, next) => {
  const { id: userId } = req.user
  const { placeId, comment } = req.body
  const tags = comment.match(/[^(]+(?=\))/g)

  if (!placeId) return next(new AppError('invalid request', StatusCodes.BAD_REQUEST))
  if (!comment) return next(new AppError('please enter a comment', StatusCodes.BAD_REQUEST))

  const newComment = new Comment(comment, placeId, userId)
  const savedComment = await newComment.save()

  const { user_id: addedBy } = await Place.findAddedBy(placeId)

  await sendAlert(req, addedBy, userId, 'comment', placeId, savedComment.id)

  if (tags) await Promise.all(tags.map(async tag => await sendAlert(req, tag, userId, 'tag', placeId, savedComment.id)))

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

  // const mentions = comments.map(async comment => {
  //   comment.mentions = []

  //   const mentions = await Mention.findByCommentId(comment.id)

  //   return mentions.map(mention => {
  //     if (mention.comment_id === comment.id) return comment.mentions.push(mention)
  //   })
  // })

  // await Promise.all(mentions)

  res.status(StatusCodes.OK).json({
    status: 'success',
    comments,
  })
})

const toggleCommentReaction = asyncHandler(async (req, res, next) => {
  const { id: userId } = req.user
  const { type, commentId, placeId } = req.body

  const reaction = await Reaction.findOne(userId, commentId)

  if (reaction && reaction.type === type) {
    await Reaction.findByIdAndDelete(userId, commentId)
    await Alert.deleteLikeAlert(commentId, placeId, type)
  }

  if (!reaction) {
    const newReaction = new Reaction(type, commentId, userId)
    await newReaction.save()

    const commentBelongsTo = await Comment.findAddedBy(commentId)
    await sendAlert(req, commentBelongsTo.user_id, userId, 'like', placeId, commentId)
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

const deleteComment = asyncHandler(async (req, res, next) => {
  const { commentId } = req.params
  if (!commentId) return next(new AppError('invalid request', StatusCodes.BAD_REQUEST))

  await Comment.findByIdAndDelete(commentId)

  res.status(StatusCodes.OK).json({
    status: 'success',
    message: 'comment deleted successfully',
  })
})

const editComment = asyncHandler(async (req, res, next) => {
  const { commentId } = req.params
  const { comment } = req.body
  if (!commentId) return next(new AppError('invalid request', StatusCodes.BAD_REQUEST))

  const updatedComment = await Comment.findByIdAndUpdate(commentId, comment)

  res.status(StatusCodes.OK).json({
    status: 'success',
    message: 'comment updated successfully',
    updatedComment,
  })
})

module.exports = {
  postComment,
  getComments,
  toggleCommentReaction,
  getCommentsForSignedInUsers,
  deleteComment,
  editComment,
}
