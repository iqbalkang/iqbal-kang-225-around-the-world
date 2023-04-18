const { StatusCodes } = require('http-status-codes')
const AppError = require('../utils/AppError')
const asyncHandler = require('express-async-handler')
const Reply = require('../models/ReplyModel')
const Comment = require('../models/CommentModel')
const Alert = require('../models/AlertModel')
const sendAlert = require('../utils/sendAlert')

const postReply = asyncHandler(async (req, res, next) => {
  const { id: userId } = req.user
  const { commentId, reply } = req.body

  if (!commentId) return next(new AppError('invalid request', StatusCodes.BAD_REQUEST))
  if (!reply) return next(new AppError('please enter a comment', StatusCodes.BAD_REQUEST))

  const { user_id: addedBy, place_id: placeId } = await Comment.findAddedBy(commentId)

  await sendAlert(req, addedBy, userId, 'reply', placeId, commentId)

  const newReply = new Reply(reply, commentId, userId)
  const savedReply = await newReply.save()

  res.status(StatusCodes.OK).json({
    status: 'success',
    message: 'reply was successfully posted',
    reply: savedReply,
  })
})

const getReplies = asyncHandler(async (req, res, next) => {
  const { commentId } = req.params

  if (!commentId) return next(new AppError('invalid request', StatusCodes.BAD_REQUEST))

  const replies = await Reply.findByCommentId(commentId)

  res.status(StatusCodes.OK).json({
    status: 'success',
    replies,
  })
})

const editReply = asyncHandler(async (req, res, next) => {
  const { replyId } = req.params
  const { reply } = req.body
  if (!replyId) return next(new AppError('invalid request', StatusCodes.BAD_REQUEST))

  const updatedReply = await Reply.findByIdAndUpdate(replyId, reply)

  res.status(StatusCodes.OK).json({
    status: 'success',
    message: 'reply updated successfully',
    updatedReply,
  })
})

const deleteReply = asyncHandler(async (req, res, next) => {
  const { replyId } = req.params
  if (!replyId) return next(new AppError('invalid request', StatusCodes.BAD_REQUEST))

  await Reply.findByIdAndDelete(replyId)

  res.status(StatusCodes.OK).json({
    status: 'success',
    message: 'reply deleted successfully',
  })
})

// const getCommentsForSignedInUsers = asyncHandler(async (req, res, next) => {
//   const { placeId } = req.params
//   const { id: userId } = req.user

//   if (!placeId) return next(new AppError('invalid request', StatusCodes.BAD_REQUEST))

//   const comments = await Comment.findByPlaceAndUserId(placeId, userId)

//   res.status(StatusCodes.OK).json({
//     status: 'success',
//     comments,
//   })
// })

module.exports = {
  postReply,
  getReplies,
  deleteReply,
  editReply,
}
