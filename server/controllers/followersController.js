const { StatusCodes } = require('http-status-codes')
const AppError = require('../utils/AppError')
const asyncHandler = require('express-async-handler')
const Follow = require('../models/FollowModel')
const Alert = require('../models/AlertModel')
const formatUser = require('../utils/formatUser')

const postFollowRequest = asyncHandler(async (req, res, next) => {
  const { id: followerId } = req.user
  const { followingId, status } = req.body

  if (!followingId) return next(new AppError('invalid request', StatusCodes.BAD_REQUEST))

  const follow = await Follow.findOne(followingId, followerId)

  if (follow) {
    await Follow.findByIdsAndDelete(followingId, followerId)
    await Alert.findByIdsAndDelete(followingId, followerId)
    res.status(StatusCodes.OK).json({
      status: 'success',
      data: {},
    })
  } else {
    const newFollower = new Follow(followingId, followerId, 'pending')
    response = await newFollower.save()

    const newAlert = new Alert(followingId, followerId, 'follow')
    const alert = await newAlert.save()
    const alertData = await Alert.findById(alert.id) // get Alert & user information

    req.app.get('eventEmitter').emit('alert', { type: 'follow', data: alertData })

    //const eventData = JSON.stringify({type: 'follow', data: alert})
    res.status(StatusCodes.OK).json({
      status: 'success',
      data: response,
    })
  }

  // res.status(StatusCodes.OK).json({
  //   status: 'success',
  //   data: response,
  // })
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

const getFollowInfo = asyncHandler(async (req, res, next) => {
  const { userId } = req.params

  if (!userId) return next(new AppError('invalid request', StatusCodes.BAD_REQUEST))

  const followers = await Follow.getFollowers(userId)
  const following = await Follow.getFollowing(userId)

  const formattedFollowers = followers.map(user => {
    const formattedUSer = formatUser(user)
    formattedUSer.status = user.status
    return formattedUSer
  })

  const formattedFollowing = following.map(user => {
    const formattedUSer = formatUser(user)
    formattedUSer.status = user.status
    return formattedUSer
  })

  res.status(StatusCodes.OK).json({
    status: 'success',
    followInfo: {
      followers: formattedFollowers,
      following: formattedFollowing,
    },
  })
})

const getFollowInfoForSignedInUsers = asyncHandler(async (req, res, next) => {
  const { userId } = req.params
  const { id: signedInuserId } = req.user

  if (!userId) return next(new AppError('invalid request', StatusCodes.BAD_REQUEST))

  const followers = await Follow.getFollowersForSignedInUsers(userId, signedInuserId)

  const following = await Follow.getFollowingForSignedInUsers(userId, signedInuserId)

  const formattedFollowers = followers.map(user => {
    const formattedUSer = formatUser(user)
    formattedUSer.status = user.status
    return formattedUSer
  })

  const formattedFollowing = following.map(user => {
    const formattedUSer = formatUser(user)
    formattedUSer.status = user.status
    return formattedUSer
  })

  res.status(StatusCodes.OK).json({
    status: 'success',
    followInfo: {
      followers: formattedFollowers,
      following: formattedFollowing,
    },
  })
})

module.exports = {
  postFollowRequest,
  responseToFollowRequest,
  getFollowInfo,
  getFollowInfoForSignedInUsers,
}
