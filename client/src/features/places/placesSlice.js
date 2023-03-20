import { createSlice } from '@reduxjs/toolkit'
import {
  deleteUserFavorite,
  getAllPlaces,
  getUserFavorite,
  getUserPlaces,
  postPlace,
  postUserFavorite,
} from './PlacesThunks'
import { toast } from 'react-toastify'

const initialState = {
  places: [],
  userPlaces: [],
  userFavorites: [],
  isLoading: false,
}

const placesSlice = createSlice({
  name: 'places',
  initialState,
  extraReducers: builder => {
    builder

      // post place
      .addCase(postPlace.pending, state => {
        state.isLoading = true
      })
      .addCase(postPlace.fulfilled, (state, { payload }) => {
        const { place, message } = payload
        state.isLoading = false
        state.userPlaces = [...state.userPlaces, place]
        toast.success(message)
      })
      .addCase(postPlace.rejected, (state, { payload }) => {
        state.isLoading = false
        toast.error(payload)
      })

      // get all places
      .addCase(getAllPlaces.pending, state => {
        state.isLoading = true
      })
      .addCase(getAllPlaces.fulfilled, (state, { payload }) => {
        const { places } = payload
        state.isLoading = false
        state.places = places
      })
      .addCase(getAllPlaces.rejected, (state, { payload }) => {
        state.isLoading = false
        toast.error(payload)
      })

      // get user places
      .addCase(getUserPlaces.pending, state => {
        state.isLoading = true
      })
      .addCase(getUserPlaces.fulfilled, (state, { payload: { places } }) => {
        state.isLoading = false
        state.userPlaces = places
      })
      .addCase(getUserPlaces.rejected, (state, { payload }) => {
        state.isLoading = false
        console.log(payload)
      })

      // add favorite place
      .addCase(postUserFavorite.pending, state => {
        state.isLoading = true
      })
      .addCase(postUserFavorite.fulfilled, (state, { payload: { favPlace, favoritePlaces } }) => {
        console.log(favoritePlaces)
        state.isLoading = false
        const updatedFavPlaceIndex = state.userPlaces.findIndex(place => place._id === favPlace.placeID)

        // if(updatedFavPlaceIndex === -1) {

        // }
        state.userPlaces[updatedFavPlaceIndex].isFavorite = !state.userPlaces[updatedFavPlaceIndex].isFavorite
      })
      .addCase(postUserFavorite.rejected, (state, { payload }) => {
        state.isLoading = false
        console.log(payload)
      })

      // delete favorite place
      .addCase(deleteUserFavorite.pending, state => {
        state.isLoading = true
      })
      .addCase(deleteUserFavorite.fulfilled, (state, { payload: { deletedPlace } }) => {
        state.isLoading = false
        const updatedFavPlaceIndex = state.userPlaces.findIndex(place => place._id === deletedPlace.placeID)
        console.log(updatedFavPlaceIndex)
        state.userPlaces[updatedFavPlaceIndex].isFavorite = !state.userPlaces[updatedFavPlaceIndex].isFavorite
      })
      .addCase(deleteUserFavorite.rejected, (state, { payload }) => {
        state.isLoading = false
        console.log(payload)
      })

      // get favorite places
      .addCase(getUserFavorite.pending, state => {
        state.isLoading = true
      })
      .addCase(getUserFavorite.fulfilled, (state, { payload: { places } }) => {
        const favoritePlaces = places.map(place => {
          const favPlace = place.placeID
          return {
            ...favPlace,
            isFavorite: true,
          }
        })
        state.isLoading = false
        state.userFavorites = favoritePlaces
      })
      .addCase(getUserFavorite.rejected, (state, { payload }) => {
        state.isLoading = false
        console.log(payload)
      })
  },
})

export default placesSlice.reducer
