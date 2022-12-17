import { createSlice } from '@reduxjs/toolkit'
import { loginUser, registerUser, getAllUsers } from './userThunk'
import { getLocalStorage, setLocalStorage, removeLocalStorage } from '../../utils/localStorage/localStorage'

const initialState = {
  user: getLocalStorage('user'),
  isLoading: false,

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
        state.isLoading = false
        state.user = payload
        setLocalStorage(payload)
      })
      .addCase(registerUser.rejected, (state, { payload }) => {
        state.isLoading = false
        console.log(payload)
      })

      // login user
      .addCase(loginUser.pending, state => {
        state.isLoading = true
      })
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.user = payload
        setLocalStorage(payload)
      })
      .addCase(loginUser.rejected, (state, { payload }) => {
        state.isLoading = false
        console.log(payload)
      })

      // get all users
      .addCase(getAllUsers.pending, state => {
        state.isLoading = true
      })
      .addCase(getAllUsers.fulfilled, (state, { payload }) => {
        console.log(payload)
        state.isLoading = false
        state.allUsers = payload
      })
      .addCase(getAllUsers.rejected, (state, { payload }) => {
        state.isLoading = false
        console.log(payload)
      })
  },
})

export const { logout } = userSlice.actions
export default userSlice.reducer
