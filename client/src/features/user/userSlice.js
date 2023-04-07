import { createSlice } from '@reduxjs/toolkit'
import { loginUser, registerUser, getAllUsers, getUserInfo, updateUser, searchUsers } from './userThunk'
import { getLocalStorage, setLocalStorage, removeLocalStorage } from '../../utils/localStorage/localStorage'
import { toast } from 'react-toastify'

const initialState = {
  user: getLocalStorage('user'),
  isLoading: false,
  currentUser: null,
  allUsers: [],
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: state => {
      state.user = null
      removeLocalStorage()
    },
  },

  extraReducers: builder => {
    // register user
    builder
      .addCase(registerUser.pending, state => {
        state.isLoading = true
      })
      .addCase(registerUser.fulfilled, (state, { payload }) => {
        const { user, message } = payload
        state.isLoading = false
        state.user = user
        setLocalStorage(user)
        toast.success(message)
      })
      .addCase(registerUser.rejected, (state, { payload }) => {
        state.isLoading = false
        toast.error(payload)
      })

      // login user
      .addCase(loginUser.pending, state => {
        state.isLoading = true
      })
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        const { user, message } = payload
        state.isLoading = false
        state.user = user
        setLocalStorage(user)
        toast.success(message)
      })
      .addCase(loginUser.rejected, (state, { payload }) => {
        state.isLoading = false
        toast.error(payload)
      })

      // update user
      .addCase(updateUser.pending, state => {
        state.isLoading = true
      })
      .addCase(updateUser.fulfilled, (state, { payload }) => {
        const { user, message } = payload
        state.isLoading = false
        state.currentUser = user
        toast.success(message)
      })
      .addCase(updateUser.rejected, (state, { payload }) => {
        console.log(payload)
        state.isLoading = false
        toast.error(payload)
      })

      // get user info
      .addCase(getUserInfo.pending, state => {
        state.isLoading = true
      })
      .addCase(getUserInfo.fulfilled, (state, { payload }) => {
        const { user } = payload
        state.isLoading = false
        state.currentUser = user
      })
      .addCase(getUserInfo.rejected, (state, { payload }) => {
        state.isLoading = false
        toast.error(payload)
      })

      // get all users
      .addCase(getAllUsers.pending, state => {
        state.isLoading = true
      })
      .addCase(getAllUsers.fulfilled, (state, { payload }) => {
        const { users } = payload
        state.isLoading = false
        state.allUsers = users
      })
      .addCase(getAllUsers.rejected, (state, { payload }) => {
        state.isLoading = false
        console.log(payload)
      })

    // // search  users
    // .addCase(searchUsers.pending, state => {
    //   state.isLoading = true
    // })
    // .addCase(searchUsers.fulfilled, (state, { payload }) => {
    //   const { users } = payload
    //   state.isLoading = false
    //   state.allUsers = users
    // })
    // .addCase(searchUsers.rejected, (state, { payload }) => {
    //   state.isLoading = false
    //   console.log(payload)
    // })
  },
})

export const { logout } = userSlice.actions
export default userSlice.reducer
