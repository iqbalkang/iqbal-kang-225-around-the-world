import { configureStore } from '@reduxjs/toolkit'
import commentsSlice from '../features/comments/commentsSlice'
import placesSlice from '../features/places/placesSlice'
import alertsSlice from '../features/replies/alertsSlice'
import userSlice from '../features/user/userSlice'

const store = configureStore({
  reducer: {
    user: userSlice,
    places: placesSlice,
    comments: commentsSlice,
    alerts: alertsSlice,
  },
})

export default store
