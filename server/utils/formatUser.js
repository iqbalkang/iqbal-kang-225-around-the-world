const User = require('../models/userModel')

const formatUser = user => {
  const { id, first_name, last_name, email, about_me, image, image_id, total_places, token } = user

  const formattedUser = { id, email }
  if (first_name) formattedUser.firstName = first_name
  if (last_name) formattedUser.lastName = last_name
  if (token) formattedUser.token = token
  if (about_me) formattedUser.aboutMe = about_me
  if (image) formattedUser.image = image
  if (image_id) formattedUser.imageId = image_id
  if (total_places) formattedUser.totalPlaces = total_places

  return formattedUser
}

module.exports = formatUser
