import { createSlice } from '@reduxjs/toolkit'

import { toast } from 'react-toastify'
import { getFollowInfo, getFollowInfoForSignedInUsers, sendFollowRequest } from './followersThunks'

const initialState = {
  followInfo: {
    followers: [],
    following: [],
  },
  isLoading: false,
}

const followersSlice = createSlice({
  name: 'followers',
  initialState,

  extraReducers: builder => {
    builder

      // send follow request
      .addCase(sendFollowRequest.pending, state => {
        state.isLoading = true
      })
      .addCase(sendFollowRequest.fulfilled, (state, { payload }) => {
        state.isLoading = false
      })
      .addCase(sendFollowRequest.rejected, (state, { payload }) => {
        state.isLoading = false
        toast.error(payload)
      })

      // get follow info
      .addCase(getFollowInfo.pending, state => {
        state.isLoading = true
      })
      .addCase(getFollowInfo.fulfilled, (state, { payload }) => {
        const { followInfo } = payload
        state.isLoading = false
        state.followInfo = followInfo
      })
      .addCase(getFollowInfo.rejected, (state, { payload }) => {
        state.isLoading = false
        toast.error(payload)
      })

      // get follow info for signed in users
      .addCase(getFollowInfoForSignedInUsers.pending, state => {
        state.isLoading = true
      })
      .addCase(getFollowInfoForSignedInUsers.fulfilled, (state, { payload }) => {
        const { followInfo } = payload
        state.isLoading = false
        state.followInfo = followInfo
      })
      .addCase(getFollowInfoForSignedInUsers.rejected, (state, { payload }) => {
        state.isLoading = false
        toast.error(payload)
      })
  },
})

export default followersSlice.reducer
