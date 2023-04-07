import { createAsyncThunk } from '@reduxjs/toolkit'
import customFetch from '../../utils/axios/customFetch'

export const sendFollowRequest = createAsyncThunk('user/sendFollowRequest', async ({ body, userId }, thunkAPI) => {
  try {
    const { data } = await customFetch.post(`/follow`, body, {
      headers: {
        authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
      },
    })
    return data
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.message)
  }
})

export const sendFollowRequestFromModal = createAsyncThunk(
  'user/sendFollowRequestFromModal',
  async ({ body, userId }, thunkAPI) => {
    try {
      const { data } = await customFetch.post(`/follow`, body, {
        headers: {
          authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
        },
      })
      thunkAPI.dispatch(getFollowInfoForSignedInUsers(userId))
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
