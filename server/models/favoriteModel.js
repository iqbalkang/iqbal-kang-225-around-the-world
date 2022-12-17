const mongoose = require('mongoose')

const favoriteSchema = new mongoose.Schema({
  placeID: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: 'Place',
  },
  addedBy: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: 'User',
  },
})

module.exports = mongoose.model('Favorite', favoriteSchema)
