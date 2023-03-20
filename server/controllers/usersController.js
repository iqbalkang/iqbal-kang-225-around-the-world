const { StatusCodes } = require('http-status-codes')
const User = require('../models/UserModel')
const AppError = require('../utils/appError')
const asyncHandler = require('express-async-handler')
const formatUser = require('../utils/formatUser')

const registerUser = asyncHandler(async (req, res, next) => {
  const { firstName, lastName, email, password, confirmPassword } = req.body
  if ((!firstName, !email, !password)) return next(new AppError('Missing fields', StatusCodes.BAD_REQUEST))
  if (password !== confirmPassword) return next(new AppError('Passwords does not match', StatusCodes.BAD_REQUEST))

  const userObj = new User(firstName, lastName, email, password)
  const user = await userObj.save()

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

  const passwordsMatch = await User.comparePasswords(password, user.password)
  if (!passwordsMatch) return next(new AppError('Invalid credentials', StatusCodes.BAD_REQUEST))

  res.status(StatusCodes.OK).json({
    status: 'success',
    message: 'login successfull',
    user: formatUser(user),
  })
})

// const getAllUsers = catchAsync(async (req, res, next) => {
//   const users = await User.aggregate([
//     {
//       $lookup: {
//         from: 'places',
//         localField: '_id',
//         foreignField: 'postedBy',
//         as: 'userPlaces',
//       },
//     },
//     {
//       $project: { password: 0 },
//     },
//   ])

//   res.status(StatusCodes.OK).json({
//     status: 'success',
//     users,
//   })
// })

module.exports = {
  registerUser,
  loginUser,
  // getAllUsers,
}
