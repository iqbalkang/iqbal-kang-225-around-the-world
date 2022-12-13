const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    minLength: 3,
    required: [true, 'Missing name'],
  },
  lastName: String,
  email: {
    type: String,
    required: [true, 'Missing email'],
    validate: [validator.isEmail, 'Wrong email'],
    unique: true,
  },
  password: {
    type: String,
    minLength: 5,
    required: [true, 'Missing password'],
  },
  confirmPassword: {
    type: String,
    required: [true, 'Missing confirm password'],
    validate: {
      validator: function (value) {
        return this.password === value
      },
      message: 'Passwords do not match',
    },
  },
})

userSchema.methods.createJWT = function (user) {
  const { _id: userID, email } = user
  return jwt.sign({ id: userID, email: email }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRY,
  })
}

userSchema.methods.comparePasswords = async function (enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password)
}

userSchema.pre('save', async function () {
  this.password = await bcrypt.hash(this.password, 12)
  this.confirmPassword = undefined
})

module.exports = mongoose.model('User', userSchema)
