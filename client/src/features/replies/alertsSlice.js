import { createSlice } from '@reduxjs/toolkit'

import { toast } from 'react-toastify'
import { deleteAlerts, getAlerts } from './alertsThunks'

const initialState = {
  alerts: [],
  isLoading: false,
}

const alertsSlice = createSlice({
  name: "alerts",
  initialState,

  reducers: {
    addAlert: (state, { payload }) => {
      //console.log("user.id", payload.userId, payload.alert_for);
      if (payload.userId === payload.alert_for) {
        state.alerts.push(payload);
        toast.success(payload.message);
      }
    },
  },

  extraReducers: (builder) => {
    builder

      // get alerts
      .addCase(getAlerts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAlerts.fulfilled, (state, { payload }) => {
        const { alerts } = payload;
        state.isLoading = false;
        state.alerts = alerts;
      })
      .addCase(getAlerts.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      })

      // delete alerts
      .addCase(deleteAlerts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteAlerts.fulfilled, (state, { payload }) => {
        state.alerts = [];
        state.isLoading = false;
      })
      .addCase(deleteAlerts.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      });
  },
});

export const { addAlert } = alertsSlice.actions;
export default alertsSlice.reducer
