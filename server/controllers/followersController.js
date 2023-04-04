const { StatusCodes } = require('http-status-codes')
const AppError = require('../utils/appError')
const asyncHandler = require('express-async-handler')
const Follow = require('../models/FollowModel')
const Alert = require('../models/AlertModel')

const postFollowRequest = asyncHandler(async (req, res, next) => {
  const { id: followerId } = req.user
  const { followingId, status } = req.body

  if (!followingId) return next(new AppError('invalid request', StatusCodes.BAD_REQUEST))

  let response

  const follow = await Follow.findOne(followingId, followerId)

  if (follow) {
    await Follow.findByIdsAndDelete(followingId, followerId)
  } else {
    const newFollower = new Follow(followingId, followerId, 'pending')
    response = await newFollower.save()

    const newAlert = new Alert(followingId, followerId, 'follow')
    await newAlert.save()
  }

  res.status(StatusCodes.OK).json({
    status: 'success',
    data: response,
  })
})

const responseToFollowRequest = asyncHandler(async (req, res, next) => {
  const { id: followingId } = req.user
  const { followerId, status } = req.body

  if (!followerId) return next(new AppError('invalid request', StatusCodes.BAD_REQUEST))

  const updatedFollower = await Follow.findByIdsAndUpdate(followingId, followerId, status)

  await Alert.findByIdsAndDelete(followingId, followerId)
  // const savedFollower = await newFollower.save()

  res.status(StatusCodes.OK).json({
    status: 'success',
    comment: updatedFollower,
  })
})

// const getComments = asyncHandler(async (req, res, next) => {
//   const { placeId } = req.params

//   if (!placeId) return next(new AppError('invalid request', StatusCodes.BAD_REQUEST))

//   const comments = await Comment.findByPlaceId(placeId)

//   res.status(StatusCodes.OK).json({
//     status: 'success',
//     comments,
//   })
// })

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

// const toggleCommentReaction = asyncHandler(async (req, res, next) => {
//   const { id: userId } = req.user
//   // const { commentId } = req.params
//   const { type, commentId } = req.body

//   const reaction = await Reaction.findOne(userId, commentId)

//   if (reaction && reaction.type === type) {
//     await Reaction.findByIdAndDelete(userId, commentId)
//   }

//   if (!reaction) {
//     const newReaction = new Reaction(type, commentId, userId)
//     await newReaction.save()
//   }

//   if (reaction && reaction.type !== type) {
//     await Reaction.findByIdAndDelete(userId, commentId)
//     const newReaction = new Reaction(type, commentId, userId)
//     await newReaction.save()
//   }

//   res.status(StatusCodes.OK).json({
//     status: 'success',
//   })
// })

module.exports = {
  postFollowRequest,
  responseToFollowRequest,
}
