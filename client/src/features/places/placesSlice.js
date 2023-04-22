import { createSlice } from '@reduxjs/toolkit'
import {
  deletePlace,
  editPlace,
  getAllPlaces,
  getSimilarPlaces,
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
  similarPlaces: [],
  singlePlace: null,
  isLoading: false,
  isEditing: false,
}

const placesSlice = createSlice({
  name: 'places',
  initialState,
  reducers: {
    toggleEditPlace: state => {
      state.isEditing = !state.isEditing
    },
  },
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
        // state.places = places
        state.places = [...state.places, ...places]
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

      // get similar places
      .addCase(getSimilarPlaces.pending, state => {
        state.isLoading = true
      })
      .addCase(getSimilarPlaces.fulfilled, (state, { payload }) => {
        const { places } = payload
        state.isLoading = false
        state.similarPlaces = places
      })
      .addCase(getSimilarPlaces.rejected, (state, { payload }) => {
        state.isLoading = false
        toast.error(payload)
      })

      // delete a place
      .addCase(deletePlace.pending, state => {
        state.isLoading = true
      })
      .addCase(deletePlace.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.places = state.places.filter(place => place.id !== payload)
        state.placesByCurrentUser = state.placesByCurrentUser.filter(place => place.id !== payload)
        state.currentUserFavorites = state.currentUserFavorites.filter(place => place.id !== payload)
        state.similarPlaces = state.similarPlaces.filter(place => place.id !== payload)
      })
      .addCase(deletePlace.rejected, (state, { payload }) => {
        state.isLoading = false
        toast.error(payload)
      })

      // edit a place
      .addCase(editPlace.pending, state => {
        state.isLoading = true
      })
      .addCase(editPlace.fulfilled, (state, { payload }) => {
        const { place } = payload
        state.isLoading = false
        state.singlePlace = place
      })
      .addCase(editPlace.rejected, (state, { payload }) => {
        state.isLoading = false
        toast.error(payload)
      })
  },
})

export const { toggleEditPlace } = placesSlice.actions
export default placesSlice.reducer
