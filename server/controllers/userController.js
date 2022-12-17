const catchAsync = require('../utils/catchAsync')
const { StatusCodes } = require('http-status-codes')
const User = require('../models/userModel')
const AppError = require('../utils/appError')

const registerUser = catchAsync(async (req, res, next) => {
  const { firstName, email, password } = req.body
  if ((!firstName, !email, !password)) return next(new AppError('Missing fields', StatusCodes.BAD_REQUEST))

  const user = await User.create(req.body)
  const token = user.createJWT(user)

  res.status(StatusCodes.CREATED).json({
    status: 'success',
    user: {
      email: user.email,
      name: { firstName: user.firstName, lastName: user.lastName },
      token,
      id: user._id,
    },
  })
})

const loginUser = catchAsync(async (req, res, next) => {
  const { email, password } = req.body
  if (!email || !password) return next(new AppError('Missing fields', StatusCodes.BAD_REQUEST))

  const user = await User.findOne({ email })
  if (!user) return next(new AppError('No user was found', StatusCodes.NOT_FOUND))

  const passwordsMatch = await user.comparePasswords(password)
  if (!passwordsMatch) return next(new AppError('Invalid credentials', StatusCodes.BAD_REQUEST))

  const token = user.createJWT(user)

  res.status(StatusCodes.OK).json({
    status: 'success',
    user: {
      email: user.email,
      name: { firstName: user.firstName, lastName: user.lastName },
      token,
      id: user._id,
    },
  })
})

const getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.aggregate([
    {
      $lookup: {
        from: 'places',
        localField: '_id',
        foreignField: 'postedBy',
        as: 'userPlaces',
      },
    },
    {
      $project: { password: 0 },
    },
  ])

  res.status(StatusCodes.OK).json({
    status: 'success',
    users,
  })
})

module.exports = {
  registerUser,
  loginUser,
  getAllUsers,
}
