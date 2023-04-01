import { createSlice } from '@reduxjs/toolkit'

import { toast } from 'react-toastify'
import { postReply } from './repliesThunks'

const initialState = {
  replies: [],
  isLoading: false,
}

const repliesSlice = createSlice({
  name: 'replies',
  initialState,

  extraReducers: builder => {
    builder

      // post comment
      .addCase(postReply.pending, state => {
        state.isLoading = true
      })
      .addCase(postReply.fulfilled, (state, { payload }) => {
        const { reply, message } = payload
        state.isLoading = false
        state.replies = [...state.replies, reply]
        toast.success(message)
      })
      .addCase(postReply.rejected, (state, { payload }) => {
        state.isLoading = false
        toast.error(payload)
      })
  },
})

export default repliesSlice.reducer
