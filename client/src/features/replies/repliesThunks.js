import { createAsyncThunk } from '@reduxjs/toolkit'
import customFetch from '../../utils/axios/customFetch'

export const postReply = createAsyncThunk('comments/postReply', async (body, thunkAPI) => {
  try {
    const { data } = await customFetch.post(`/reply`, body, {
      headers: {
        authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
      },
    })

    return data
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.message)
  }
})

export const getReplies = createAsyncThunk('comments/getReplies', async (commentId, thunkAPI) => {
  try {
    const { data } = await customFetch.get(`/reply/${commentId}`)
    return data
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.message)
  }
})
