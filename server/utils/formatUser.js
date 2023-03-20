const User = require('../models/UserModel')

const formatUser = user => {
  const token = User.createJWT(user)
  const { id, first_name, last_name, email, about, image } = user

  const formattedUser = { id, email, token }
  if (first_name) formattedUser.firstName = first_name
  if (last_name) formattedUser.lastName = last_name
  if (about) formattedUser.about = about
  if (image) formattedUser.image = image

  return formattedUser
}

module.exports = formatUser
