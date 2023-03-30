import { createAsyncThunk } from '@reduxjs/toolkit'
import customFetch from '../../utils/axios/customFetch'

export const registerUser = createAsyncThunk('user/registerUser', async (user, thunkAPI) => {
  try {
    const { data } = await customFetch.post('/authentication/register', user)
    return data
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data.message)
  }
})

export const loginUser = createAsyncThunk('user/loginUser', async (user, thunkAPI) => {
  try {
    const { data } = await customFetch.post('/authentication/login', user)
    return data
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.message)
  }
})

export const updateUser = createAsyncThunk('user/updateUser', async (user, thunkAPI) => {
  try {
    const { data } = await customFetch.put(`/authentication/update`, user, {
      headers: {
        authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
      },
    })
    return data
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.message)
  }
})

export const getUserInfo = createAsyncThunk('user/getUserInfo', async (userId, thunkAPI) => {
  try {
    const { data } = await customFetch.get(`/authentication/user/${userId}`)
    return data
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.message)
  }
})

export const getAllUsers = createAsyncThunk('user/getAllUsers', async (_, thunkAPI) => {
  try {
    const { data } = await customFetch.get('/authentication/all-users')
    return data
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.message)
  }
})

// export const getUserPlaces = createAsyncThunk('user/getUserPlaces', async (place, thunkAPI) => {
//   try {
//     const { data } = await customFetch.get('/places', {})
//     console.log(data)
//     return data
//   } catch (error) {
//     return thunkAPI.rejectWithValue(error.response.data.message)
//   }
// })

// export const getUserPlaces = createAsyncThunk('user/getUserPlaces', async (userID, thunkAPI) => {
//   try {
//     const { data } = await customFetch.get(`/places/${userID}`, {
//       headers: {
//         authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
//       },
//     })
//     return data
//   } catch (error) {
//     return thunkAPI.rejectWithValue(error.response.data.message)
//   }
// })

// export const postPlace = createAsyncThunk('user/postPlace', async ({ place, userID }, thunkAPI) => {
//   try {
//     const { data } = await customFetch.post(`/places/${userID}`, place, {
//       headers: {
//         authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
//       },
//     })
//     console.log(data)
//   } catch (error) {
//     console.log(error.response)
//   }
// })
