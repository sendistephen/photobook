import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import {
  fetchData,
  getUserCollections,
  getUserPhotosUrl,
  getUserUrl,
} from '../utils/api';
import { handleAsyncThunkCases } from '../utils/helper';

// Async thunk for fetching user details
export const fetchUser = createAsyncThunk(
  'user/fetchUser',
  async (username, { rejectWithValue }) => {
    return fetchData(getUserUrl, username, rejectWithValue);
  },
);

// Async thunk for fetching user photos
export const fetchUserPhotos = createAsyncThunk(
  'user/fetchUserPhotos',
  async ({ username, page, perPage = 30 }, { rejectWithValue }) => {
    return fetchData(
      getUserPhotosUrl,
      { username, page, perPage },
      rejectWithValue,
    );
  },
);

// Async thunk for fetching user collections
export const fetchUserCollections = createAsyncThunk(
  'user/fetchUserCollections',
  async ({ username, page = 1, perPage = 10 }, { rejectWithValue }) => {
    return fetchData(
      getUserCollections,
      { username, page, perPage },
      rejectWithValue,
    );
  },
);

const initialState = {
    user: {},
    photos: [],
    collections: [],
    isLoading: false,
    page: 1,
    perPage: 5,
    hasMore: true,
    index: null,
    error: null,
  },
  userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
      clearUserPhotos: (state) => {
        state.photos = [];
      },
      openModal: (state, action) => {
        state.index = action.payload;
      },
      hideModal: (state) => {
        state.index = null;
      },
    },
    extraReducers: (builder) => {
      handleAsyncThunkCases(builder, fetchUser, {
        fulfilled: (state, action) => {
          state.user = action.payload;
        },
      });
      handleAsyncThunkCases(builder, fetchUserPhotos, {
        fulfilled: (state, action) => {
          const newPhotos = action.payload,
            existingPhotoIds = new Set(state.photos.map((photo) => photo.id)),
            mergedPhotos = [
              ...state.photos,
              ...newPhotos.filter((photo) => !existingPhotoIds.has(photo.id)),
            ];
          state.photos = mergedPhotos;
          state.hasMore = newPhotos.length === state.perPage;
        },
      });
      handleAsyncThunkCases(builder, fetchUserCollections, {
        fulfilled: (state, action) => {
          state.collections = [...state.collections, ...action.payload];
          state.hasMore = Boolean(action.payload.length);
        },
      });
    },
  });

// Export actions and reducer
export const { clearUserPhotos, openModal, hideModal } = userSlice.actions;
export default userSlice.reducer;
