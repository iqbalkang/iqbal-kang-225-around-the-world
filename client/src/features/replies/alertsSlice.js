import { createSlice } from '@reduxjs/toolkit'

import { toast } from 'react-toastify'
import { getAlerts } from './alertsThunks'

const initialState = {
  alerts: [],
  isLoading: false,
}

const alertsSlice = createSlice({
  name: 'alerts',
  initialState,

  extraReducers: builder => {
    builder

      // get alerts
      .addCase(getAlerts.pending, state => {
        state.isLoading = true
      })
      .addCase(getAlerts.fulfilled, (state, { payload }) => {
        const { alerts } = payload
        state.isLoading = false
        state.alerts = alerts
      })
      .addCase(getAlerts.rejected, (state, { payload }) => {
        state.isLoading = false
        toast.error(payload)
      })
  },
})

export default alertsSlice.reducer
