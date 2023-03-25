import { createSlice } from '@reduxjs/toolkit'
import {
  getAllPlaces,
  getSinglePlace,
  getUserFavorite,
  getUserFavorites,
  getUserPlaces,
  postPlace,
  postUserFavorite,
  toggleLikedPlace,
} from './PlacesThunks'
import { toast } from 'react-toastify'

const initialState = {
  places: [],
  placesByCurrentUser: [],
  currentUserFavorites: [],
  singlePlace: null,
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
        state.placesByCurrentUser = [...state.placesByCurrentUser, place]
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
      .addCase(getUserPlaces.fulfilled, (state, { payload }) => {
        const { places } = payload
        state.isLoading = false
        state.placesByCurrentUser = places
      })
      .addCase(getUserPlaces.rejected, (state, { payload }) => {
        state.isLoading = false
        toast.error(payload)
      })

      // get single place
      .addCase(getSinglePlace.pending, state => {
        state.isLoading = true
      })
      .addCase(getSinglePlace.fulfilled, (state, { payload }) => {
        const { place } = payload
        state.isLoading = false
        state.singlePlace = place
      })
      .addCase(getSinglePlace.rejected, (state, { payload }) => {
        state.isLoading = false
        toast.error(payload)
      })

      // toggle liked place
      .addCase(toggleLikedPlace.pending, state => {
        state.isLoading = true
      })
      .addCase(toggleLikedPlace.fulfilled, (state, { payload }) => {
        state.isLoading = false

        state.places = state.places.map(place => {
          if (place.id === payload) return { ...place, isFavorite: !place.isFavorite }
          else return place
        })

        state.placesByCurrentUser = state.placesByCurrentUser.map(place => {
          if (place.id === payload) return { ...place, isFavorite: !place.isFavorite }
          else return place
        })

        state.currentUserFavorites = state.currentUserFavorites.filter(place => place.id !== payload)

        state.singlePlace = { ...state.singlePlace, isFavorite: !state.singlePlace?.isFavorite }
      })
      .addCase(toggleLikedPlace.rejected, (state, { payload }) => {
        state.isLoading = false
        toast.error(payload)
      })

      // get user favorites
      .addCase(getUserFavorites.pending, state => {
        state.isLoading = true
      })
      .addCase(getUserFavorites.fulfilled, (state, { payload }) => {
        const { places } = payload
        state.isLoading = false
        state.currentUserFavorites = places
      })
      .addCase(getUserFavorites.rejected, (state, { payload }) => {
        state.isLoading = false
        toast.error(payload)
      })

    // add favorite place
    // .addCase(postUserFavorite.pending, state => {
    //   state.isLoading = true
    // })
    // .addCase(postUserFavorite.fulfilled, (state, { payload: { favPlace, favoritePlaces } }) => {
    //   console.log(favoritePlaces)
    //   state.isLoading = false
    //   const updatedFavPlaceIndex = state.placesByCurrentUser.findIndex(place => place._id === favPlace.placeID)

    //   // if(updatedFavPlaceIndex === -1) {

    //   // }
    //   state.placesByCurrentUser[updatedFavPlaceIndex].isFavorite = !state.placesByCurrentUser[updatedFavPlaceIndex].isFavorite
    // })
    // .addCase(postUserFavorite.rejected, (state, { payload }) => {
    //   state.isLoading = false
    //   console.log(payload)
    // })

    // delete favorite place
    // .addCase(deleteUserFavorite.pending, state => {
    //   state.isLoading = true
    // })
    // .addCase(deleteUserFavorite.fulfilled, (state, { payload: { deletedPlace } }) => {
    //   state.isLoading = false
    //   const updatedFavPlaceIndex = state.placesByCurrentUser.findIndex(place => place._id === deletedPlace.placeID)
    //   console.log(updatedFavPlaceIndex)
    //   state.placesByCurrentUser[updatedFavPlaceIndex].isFavorite = !state.placesByCurrentUser[updatedFavPlaceIndex].isFavorite
    // })
    // .addCase(deleteUserFavorite.rejected, (state, { payload }) => {
    //   state.isLoading = false
    //   console.log(payload)
    // })

    // get favorite places
  },
})

export default placesSlice.reducer
