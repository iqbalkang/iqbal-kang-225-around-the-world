import { createSlice } from '@reduxjs/toolkit'

import { toast } from 'react-toastify'
import { getComments, getCommentsForSignedInUsers, postComment, toggleCommentReaction } from './commentsThunks'

const initialState = {
  comments: [],
  isLoading: false,
}

const commentsSlice = createSlice({
  name: 'comments',
  initialState,

  extraReducers: builder => {
    builder

      // post comment
      .addCase(postComment.pending, state => {
        state.isLoading = true
      })
      .addCase(postComment.fulfilled, (state, { payload }) => {
        const { comment, message } = payload
        state.isLoading = false
        state.comments = [...state.comments, comment]
        toast.success(message)
      })
      .addCase(postComment.rejected, (state, { payload }) => {
        state.isLoading = false
        toast.error(payload)
      })

      // get comments
      .addCase(getComments.pending, state => {
        state.isLoading = true
      })
      .addCase(getComments.fulfilled, (state, { payload }) => {
        const { comments } = payload
        state.isLoading = false
        state.comments = comments
      })
      .addCase(getComments.rejected, (state, { payload }) => {
        state.isLoading = false
        toast.error(payload)
      })

      // get signed in user comments
      .addCase(getCommentsForSignedInUsers.pending, state => {
        state.isLoading = true
      })
      .addCase(getCommentsForSignedInUsers.fulfilled, (state, { payload }) => {
        const { comments } = payload
        state.isLoading = false
        state.comments = comments
      })
      .addCase(getCommentsForSignedInUsers.rejected, (state, { payload }) => {
        state.isLoading = false
        toast.error(payload)
      })
  },
})

export default commentsSlice.reducer
