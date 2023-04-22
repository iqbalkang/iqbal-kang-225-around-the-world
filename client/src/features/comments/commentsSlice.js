import { createSlice } from '@reduxjs/toolkit'

import { toast } from 'react-toastify'
import {
  deleteComment,
  editComment,
  getComments,
  getCommentsForSignedInUsers,
  postComment,
  toggleCommentReaction,
} from './commentsThunks'

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
        // toast.success(message)
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

      // delete a comment
      .addCase(deleteComment.pending, state => {
        state.isLoading = true
      })
      .addCase(deleteComment.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.comments = state.comments.filter(comment => comment.id !== payload)
      })
      .addCase(deleteComment.rejected, (state, { payload }) => {
        state.isLoading = false
        toast.error(payload)
      })

      // delete a comment
      .addCase(editComment.pending, state => {
        state.isLoading = true
      })
      .addCase(editComment.fulfilled, (state, { payload }) => {
        const { updatedComment } = payload
        state.isLoading = false
        state.comments = state.comments.map(comment => {
          if (comment.id === updatedComment.id) return { ...comment, comment: updatedComment.comment }
          else return comment
        })
      })
      .addCase(editComment.rejected, (state, { payload }) => {
        state.isLoading = false
        toast.error(payload)
      })
  },
})

export default commentsSlice.reducer
