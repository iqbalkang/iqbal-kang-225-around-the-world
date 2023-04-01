import { createAsyncThunk } from '@reduxjs/toolkit'
import customFetch from '../../utils/axios/customFetch'

export const postComment = createAsyncThunk('comments/postComment', async (body, thunkAPI) => {
  try {
    const { data } = await customFetch.post(`/comments`, body, {
      headers: {
        authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
      },
    })

    const user = thunkAPI.getState().user.user
    const { firstName, lastName, image } = user

    const commentWithUser = { ...data.comment, first_name: firstName, last_name: lastName, image }
    const updateComment = { ...data, comment: commentWithUser }

    return updateComment
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.message)
  }
})

export const getComments = createAsyncThunk('comments/getComments', async (placeId, thunkAPI) => {
  try {
    const { data } = await customFetch.get(`/comments/${placeId}`)
    return data
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.message)
  }
})

export const getCommentsForSignedInUsers = createAsyncThunk(
  'comments/getCommentsForSignedInUsers',
  async (placeId, thunkAPI) => {
    try {
      const { data } = await customFetch.get(`/comments/user/${placeId}`, {
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

export const toggleCommentReaction = createAsyncThunk('comments/toggleCommentReaction', async (body, thunkAPI) => {
  try {
    const { data } = await customFetch.post(`/comments/reaction`, body, {
      headers: {
        authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
      },
    })
    return data
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.message)
  }
})
