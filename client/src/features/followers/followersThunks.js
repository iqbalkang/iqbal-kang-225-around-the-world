import { createAsyncThunk } from '@reduxjs/toolkit'
import customFetch from '../../utils/axios/customFetch'
import { getSinglePlace } from '../places/PlacesThunks'

export const sendFollowRequest = createAsyncThunk('user/sendFollowRequest', async (body, thunkAPI) => {
  const { id: userId } = thunkAPI.getState().user.currentUser
  try {
    const { data } = await customFetch.post(`/follow`, body, {
      headers: {
        authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
      },
    })
    thunkAPI.dispatch(getFollowInfoForSignedInUsers(userId))
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.message)
  }
})

export const sendFollowRequestFromSinglePlace = createAsyncThunk(
  'user/sendFollowRequestFromSinglePlace',
  async ({ body, placeId }, thunkAPI) => {
    const { id: userId } = thunkAPI.getState().user.user
    try {
      const { data } = await customFetch.post(`/follow`, body, {
        headers: {
          authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
        },
      })
      thunkAPI.dispatch(getSinglePlace({ userId, placeId }))
      return data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message)
    }
  }
)

export const getFollowInfo = createAsyncThunk('user/getFollowInfo', async (userId, thunkAPI) => {
  try {
    const { data } = await customFetch.get(`/follow/${userId}`)
    return data
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.message)
  }
})

export const getFollowInfoForSignedInUsers = createAsyncThunk(
  'user/getFollowInfoForSignedInUsers',
  async (userId, thunkAPI) => {
    try {
      const { data } = await customFetch.get(`/follow/auth/${userId}`, {
        headers: {
          authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
        },
      })
      return data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message)
    }
  }
)
