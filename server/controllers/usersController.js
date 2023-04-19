const { StatusCodes } = require('http-status-codes')
const User = require('../models/UserModel')
const AppError = require('../utils/AppError')
const asyncHandler = require('express-async-handler')
const formatUser = require('../utils/formatUser')
const cloudinaryUpload = require('../utils/cloudinaryUpload')
const cloudinary = require('cloudinary').v2

const registerUser = asyncHandler(async (req, res, next) => {
  const { firstName, lastName, email, password, confirmPassword } = req.body
  if ((!firstName, !email, !password)) return next(new AppError('Missing fields', StatusCodes.BAD_REQUEST))

  if (password !== confirmPassword) return next(new AppError('Passwords does not match', StatusCodes.BAD_REQUEST))

  const userObj = new User(firstName, lastName, email, password)
  const user = await userObj.save()

  const token = User.createJWT(user)
  user.token = token

  res.status(StatusCodes.CREATED).json({
    status: 'success',
    message: 'registeration successfull',
    user: formatUser(user),
  })
})

const loginUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body
  if (!email || !password) return next(new AppError('Missing fields', StatusCodes.BAD_REQUEST))

  const user = await User.findOne(email)
  if (!user) return next(new AppError('No user was found', StatusCodes.NOT_FOUND))

  const token = User.createJWT(user)
  user.token = token

  const passwordsMatch = await User.comparePasswords(password, user.password)
  if (!passwordsMatch) return next(new AppError('Invalid credentials', StatusCodes.BAD_REQUEST))

  res.status(StatusCodes.OK).json({
    status: 'success',
    message: 'login successfull',
    user: formatUser(user),
  })
})

const getUserInfo = asyncHandler(async (req, res, next) => {
  const { userId } = req.params

  const user = await User.findOneById(userId)
  if (!user) return next(new AppError('No user was found', StatusCodes.NOT_FOUND))

  const formattedUser = formatUser(user)
  formattedUser.status = user.status
  formattedUser.isPublic = user.is_public

  formattedUser.followers = user.followers
  formattedUser.following = user.following

  res.status(StatusCodes.OK).json({
    status: 'success',
    user: formattedUser,
  })
})

const getUserInfoForSignedInUsers = asyncHandler(async (req, res, next) => {
  const { userId } = req.params
  const { id: signedInUserId } = req.user

  const user = await User.findOneByIds(userId, signedInUserId)
  if (!user) return next(new AppError('No user was found', StatusCodes.NOT_FOUND))
  const formattedUser = formatUser(user)

  formattedUser.isPublic = user.is_public
  formattedUser.status = user.status
  formattedUser.isFollowedByCurrentUser = user.is_followed_by_current_user

  formattedUser.followers = user.followers
  formattedUser.following = user.following
  formattedUser.places = user.places

  res.status(StatusCodes.OK).json({
    status: 'success',
    user: formattedUser,
  })
})

const updateUser = asyncHandler(async (req, res, next) => {
  let { firstName, lastName, aboutMe, isPublic } = req.body
  const image = req.file
  const { email } = req.user
  if ((!firstName, !lastName)) return next(new AppError('Missing fields', StatusCodes.BAD_REQUEST))

  let imageUrl = null
  let imageId = null

  const oldUser = await User.findOne(email)
  const oldImageId = oldUser?.image_id

  if (image && oldImageId) {
    const { result } = await cloudinary.uploader.destroy(oldImageId)
    if (result !== 'ok') next(new AppError('Could not delete the image from cloud.', StatusCodes.NOT_MODIFIED))
  }

  if (image) {
    const { url, public_id } = await cloudinaryUpload(image.path)
    imageUrl = url
    imageId = public_id
  }

  if (!aboutMe) aboutMe = 'add some description'
  if (!imageUrl) imageUrl = oldUser.image
  if (!imageId) imageId = oldUser.image_id

  const userObj = new User(firstName, lastName, null, null, aboutMe, isPublic, imageUrl, imageId)
  const user = await userObj.updateOne(email)

  const formattedUser = formatUser(user)
  formattedUser.isPublic = user.is_public

  res.status(StatusCodes.CREATED).json({
    status: 'success',
    message: 'user was updated successfully',
    user: formattedUser,
  })
})

const getAllUsers = asyncHandler(async (req, res, next) => {
  const { page, limit } = req.query

  const skip = +page * +limit

  const users = await User.findAllUsers(skip, limit)
  if (!users) return next(new AppError('No users were found', StatusCodes.NOT_FOUND))

  const formattedUsers = users.map(user => formatUser(user))

  res.status(StatusCodes.OK).json({
    status: 'success',
    users: formattedUsers,
  })
})

const searchUsers = asyncHandler(async (req, res, next) => {
  let { name } = req.query

  const users = await User.searchUser(name)
  if (!users) return next(new AppError('No users were found', StatusCodes.NOT_FOUND))

  const formattedUsers = users.map(user => ({
    id: user.id,
    display: user.first_name + ' ' + user.last_name,
  }))

  res.status(StatusCodes.OK).json({
    status: 'success',
    users: formattedUsers,
  })
})

module.exports = {
  registerUser,
  loginUser,
  updateUser,
  getUserInfo,
  getAllUsers,
  getUserInfoForSignedInUsers,
  searchUsers,
}
