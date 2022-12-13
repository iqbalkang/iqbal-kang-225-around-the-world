import { createSlice } from '@reduxjs/toolkit'
import { getAllPlaces } from './PlacesThunks'

const initialState = {
  places: [],
  isLoading: false,
}

const placesSlice = createSlice({
  name: 'places',
  initialState,
  extraReducers: builder => {
    builder
      .addCase(getAllPlaces.pending, state => {
        state.isLoading = false
      })
      .addCase(getAllPlaces.fulfilled, (state, { payload: { places } }) => {
        state.isLoading = true
        state.places = places
      })
  },
})

export default placesSlice.reducer
