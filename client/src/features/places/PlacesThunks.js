import { createAsyncThunk } from '@reduxjs/toolkit'
import customFetch from '../../utils/axios/customFetch'

export const getAllPlaces = createAsyncThunk('places/getAllPlaces', async (_, thunkAPI) => {
  try {
    const { data } = await customFetch.get('places/allPlaces')
    return data
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.message)
  }
})
