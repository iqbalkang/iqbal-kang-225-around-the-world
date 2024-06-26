import { createAsyncThunk } from '@reduxjs/toolkit';
import customFetch from '../../utils/axios/customFetch';

export const postPlace = createAsyncThunk('places/postPlace', async (formData, thunkAPI) => {
  try {
    const { data } = await customFetch.post(`/places/`, formData, {
      headers: {
        authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
      },
    });
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
});

export const getAllPlaces = createAsyncThunk(
  'places/getAllPlaces',
  async ({ userId, currentPage, limit }, thunkAPI) => {
    let url;
    if (!userId) url = `/places?page=${currentPage}&limit=${limit}`;
    if (userId) url = `/places?user=${userId}&page=${currentPage}&limit=${limit}`;

    try {
      const { data } = await customFetch.get(url);
      return data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const getUserPlaces = createAsyncThunk(
  'places/getUserPlaces',
  async ({ userId, signedInUser, currentPage, limit }, thunkAPI) => {
    let url = '/places/user-places/';
    if (!signedInUser) url = url + `${userId}?page=${currentPage}&limit=${limit}`;
    if (signedInUser) url = url + `${userId}?signedInUser=${signedInUser}&page=${currentPage}&limit=${limit}`;

    try {
      const { data } = await customFetch.get(url);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const toggleLikedPlace = createAsyncThunk('places/toggleLikedPlace', async (placeId, thunkAPI) => {
  try {
    const { data } = await customFetch.post(`/places/like/${placeId}`, null, {
      headers: {
        authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
      },
    });
    return placeId;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
});

export const getUserFavorites = createAsyncThunk(
  'places/getUserFavorites',
  async ({ currentPage, limit }, thunkAPI) => {
    try {
      const { data } = await customFetch.get(`/places/favorites?page=${currentPage}&limit=${limit}`, {
        headers: {
          authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
        },
      });
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const getSinglePlace = createAsyncThunk('places/getSinglePlace', async ({ userId, placeId }, thunkAPI) => {
  let url = `places/${placeId}`;
  if (userId) url = `${url}?user=${userId}`;

  try {
    const { data } = await customFetch.get(url);
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
});

export const getSimilarPlacesForSignedInUsers = createAsyncThunk(
  'places/getSimilarPlaces',
  async (placeID, thunkAPI) => {
    let url = '/places/auth/similar/' + placeID;

    try {
      const { data } = await customFetch.get(url, {
        headers: {
          authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
        },
      });
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const getSimilarPlaces = createAsyncThunk('places/getSimilarPlaces', async (placeId, thunkAPI) => {
  let url = '/places/similar/' + placeId;

  try {
    const { data } = await customFetch.get(url);
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
});

export const deletePlace = createAsyncThunk('places/deletePlace', async (placeId, thunkAPI) => {
  let url = '/places/' + placeId;

  try {
    const { data } = await customFetch.delete(url, {
      headers: {
        authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
      },
    });
    return placeId;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
});

export const editPlace = createAsyncThunk('places/editPlace', async (formData, thunkAPI) => {
  let url = '/places/' + formData.id;
  console.log(formData);

  try {
    const { data } = await customFetch.patch(url, formData, {
      headers: {
        authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
      },
    });
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
});
