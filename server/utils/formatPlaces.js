const formatPlaces = places => {
  return places.map(place => {
    const placeObj = { ...place, isFavorite: place.is_favorite, firstName: place.first_name, userId: place.user_id }
    delete placeObj.is_favorite
    delete placeObj.first_name
    delete placeObj.user_id
    return placeObj
  })
}

module.exports = formatPlaces
