const User = require('../models/UserModel')

const formatUser = user => {
  const token = User.createJWT(user)
  const { id, first_name, last_name, email, about_me, image, image_id } = user

  const formattedUser = { id, email, token }
  if (first_name) formattedUser.firstName = first_name
  if (last_name) formattedUser.lastName = last_name
  if (about_me) formattedUser.aboutMe = about_me
  if (image) formattedUser.image = image
  if (image_id) formattedUser.imageId = image_id

  return formattedUser
}

module.exports = formatUser
