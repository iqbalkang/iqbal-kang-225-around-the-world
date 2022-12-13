import { configureStore } from '@reduxjs/toolkit'
import exploreInputsSlice from '../features/exploreInputsSlice/exploreInputsSlice'
import placesSlice from '../features/places/placesSlice'
import userSlice from '../features/user/userSlice'

const store = configureStore({
  reducer: {
    user: userSlice,
    exploreInputs: exploreInputsSlice,
    places: placesSlice,
  },
})

export default store
