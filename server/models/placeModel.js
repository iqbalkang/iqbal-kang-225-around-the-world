const mongoose = require('mongoose')

const placeSchema = mongoose.Schema({
  address: {
    type: String,
    required: [true, 'Missing location address'],
  },
  title: {
    type: String,
    required: [true, 'Missing location name'],
  },
  country: {
    type: String,
    required: [true, 'Missing location country'],
  },
  description: {
    type: String,
    required: [true, 'Missing location description'],
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
    default: 0,
  },
  coordinates: {
    type: [{ lat: Number, lng: Number }],
  },
  postedBy: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  isFavorite: {
    type: Boolean,
    default: false,
  },
})

module.exports = mongoose.model('Place', placeSchema)
