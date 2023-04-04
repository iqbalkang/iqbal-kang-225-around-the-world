import { createAsyncThunk } from '@reduxjs/toolkit'
import customFetch from '../../utils/axios/customFetch'

export const getAlerts = createAsyncThunk('alerts/getAlerts', async (_, thunkAPI) => {
  try {
    const { data } = await customFetch.get(`/alerts`, {
      headers: {
        authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
      },
    })

    return data
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.message)
  }
})
