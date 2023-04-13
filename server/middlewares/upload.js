const { StatusCodes } = require('http-status-codes')
const multer = require('multer')
const AppError = require('../utils/appError')

const storage = multer.diskStorage({})

const fileFilterImage = (req, file, cb) => {
  if (!file.mimetype.startsWith('image'))
    return cb(new AppError('Only image files are supported', StatusCodes.BAD_REQUEST), false)

  cb(null, true)
}

const uploadImage = multer({ storage, fileFilter: fileFilterImage })

module.exports = uploadImage
