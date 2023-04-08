const { StatusCodes } = require('http-status-codes')
const AppError = require('../utils/appError')
const asyncHandler = require('express-async-handler')
const Reply = require('../models/ReplyModel')

const postReply = asyncHandler(async (req, res, next) => {
  const { id: userId } = req.user
  const { commentId, reply } = req.body

  // const tags = reply.match(/[^(]+(?=\))/g)

  // console.log(reply)

  if (!commentId) return next(new AppError('invalid request', StatusCodes.BAD_REQUEST))
  if (!reply) return next(new AppError('please enter a comment', StatusCodes.BAD_REQUEST))

  const newReply = new Reply(reply, commentId, userId)
  const savedReply = await newReply.save()

  // if (tags) {
  //   tags.map(async tag => {
  //     const newAlert = new Alert(tag, userId, 'tag', placeId, savedComment.id)
  //     const newMention = new Mention(tag, userId, savedComment.id)
  //     await newAlert.save()
  //     await newMention.save()
  //   })
  // }

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
}
