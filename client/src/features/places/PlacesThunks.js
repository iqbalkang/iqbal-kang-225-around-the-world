import { createAsyncThunk } from '@reduxjs/toolkit'
import customFetch from '../../utils/axios/customFetch'

export const getAllPlaces = createAsyncThunk('places/getAllPlaces', async (userID, thunkAPI) => {
  try {
    const { data } = await customFetch.get(`/places/all/${userID}`)
    return data
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.message)
  }
})

export const getUserPlaces = createAsyncThunk('places/getUserPlaces', async (userID, thunkAPI) => {
  try {
    const { data } = await customFetch.get(`/places/${userID}`, {
      headers: {
        authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
      },
    })
    return data
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.message)
  }
})

export const postPlace = createAsyncThunk('places/postPlace', async ({ place, userID }, thunkAPI) => {
  try {
    const { data } = await customFetch.post(`/places/${userID}`, place, {
      headers: {
        authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
      },
    })
    console.log(data)
  } catch (error) {
    console.log(error.response)
  }
})

export const getUserFavorite = createAsyncThunk('places/getUserFavorite', async (userID, thunkAPI) => {
  try {
    const { data } = await customFetch.get(`places/favorites/${userID}`, {
      headers: {
        authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
      },
    })
    return data
  } catch (error) {
    console.log(error.response)
  }
})

export const postUserFavorite = createAsyncThunk('places/postUserFavorite', async (body, thunkAPI) => {
  try {
    const { data } = await customFetch.post('places/favorite', body, {
      headers: {
        authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
      },
    })
    // console.log(data)
    return data
  } catch (error) {
    console.log(error.response)
  }
})

export const deleteUserFavorite = createAsyncThunk('places/deleteUserFavorite', async (placeID, thunkAPI) => {
  try {
    const { data } = await customFetch.delete(`places/${placeID}`, {
      headers: {
        authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
      },
    })
    // console.log(data)
    return data
  } catch (error) {
    console.log(error.response)
  }
})
