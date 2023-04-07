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

export const deleteAlerts = createAsyncThunk('alerts/deleteAlerts', async (_, thunkAPI) => {
  try {
    const { data } = await customFetch.delete(`/alerts`, {
      headers: {
        authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
      },
    })

    return data
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.message)
  }
})

export const deleteSingleAlert = createAsyncThunk('alerts/deleteSingleAlert', async (placeId, thunkAPI) => {
  try {
    const { data } = await customFetch.delete(`/alerts/${placeId}`, {
      headers: {
        authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
      },
    })

    return data
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.message)
  }
})
