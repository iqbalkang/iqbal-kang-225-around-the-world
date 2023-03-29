import { createAsyncThunk } from '@reduxjs/toolkit'
import customFetch from '../../utils/axios/customFetch'

export const postPlace = createAsyncThunk('places/postPlace', async (formData, thunkAPI) => {
  try {
    const { data } = await customFetch.post(`/places/`, formData, {
      headers: {
        authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
      },
    })
    return data
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.message)
  }
})

export const getAllPlaces = createAsyncThunk('places/getAllPlaces', async (userId, thunkAPI) => {
  let url = '/places'

  if (userId) url = `${url}?user=${userId}`

  try {
    const { data } = await customFetch.get(url)
    return data
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.message)
  }
})

export const getUserPlaces = createAsyncThunk('places/getUserPlaces', async ({ userId, signedInUser }, thunkAPI) => {
  console.log(userId, signedInUser)
  let url = `/places/user-places/${userId}`

  if (signedInUser) url = `${url}?signedInUser=${signedInUser}`
  try {
    const { data } = await customFetch.get(url, {
      headers: {
        authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
      },
    })
    return data
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.message)
  }
})

export const toggleLikedPlace = createAsyncThunk('places/toggleLikedPlace', async (placeId, thunkAPI) => {
  try {
    const { data } = await customFetch.post(`/places/like/${placeId}`, null, {
      headers: {
        authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
      },
    })
    return placeId
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.message)
  }
})

export const getUserFavorites = createAsyncThunk('places/getUserFavorites', async (_, thunkAPI) => {
  try {
    const { data } = await customFetch.get(`/places/favorites`, {
      headers: {
        authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
      },
    })
    return data
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.message)
  }
})

export const getSinglePlace = createAsyncThunk('places/getSinglePlace', async ({ userId, placeId }, thunkAPI) => {
  let url = `places/${placeId}`
  if (userId) url = `${url}?user=${userId}`

  try {
    const { data } = await customFetch.get(url)
    return data
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.message)
  }
})

////////////////////////////////

// export const getUserPlaces = createAsyncThunk('places/getUserPlaces', async (userID, thunkAPI) => {
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

// export const deleteUserFavorite = createAsyncThunk('places/deleteUserFavorite', async (placeID, thunkAPI) => {
//   try {
//     const { data } = await customFetch.delete(`places/${placeID}`, {
//       headers: {
//         authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
//       },
//     })
//     // console.log(data)
//     return data
//   } catch (error) {
//     console.log(error.response)
//   }
// })
