import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { fetchData, getPhotoUrl, getSingleTopic } from '../utils/api';

// Async thunk for fetching a single photo
export const fetchPhoto = createAsyncThunk(
  'photo/fetchPhoto',
  async (id, { rejectWithValue }) => {
    return fetchData(getPhotoUrl, id, rejectWithValue);
  },
);

// Async thunk for fetching photo topics
export const fetchPhotoTopic = createAsyncThunk(
  'photo/fetchPhotoTopic',
  async (searchWord, { rejectWithValue }) => {
    return fetchData(getSingleTopic, searchWord, rejectWithValue);
  },
);

const photoSlice = createSlice({
  name: 'photo',
  initialState: {
    photo: {},
    topic: {},
    isLoading: false,
    error: '',
    index: -1,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handling fetchPhoto
      .addCase(fetchPhoto.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchPhoto.fulfilled, (state, action) => {
        state.photo = action.payload;
        state.isLoading = false;
        state.error = '';
      })
      .addCase(fetchPhoto.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Handling fetchPhotoTopic
      .addCase(fetchPhotoTopic.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchPhotoTopic.fulfilled, (state, action) => {
        state.topic = action.payload;
        state.isLoading = false;
        state.error = '';
      })
      .addCase(fetchPhotoTopic.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

// Selectors
export const selectPhoto = (state) => state.photo.photo;
export const selectTopic = (state) => state.photo.topic;
export const selectIsLoading = (state) => state.photo.isLoading;
export const selectError = (state) => state.photo.error;
export const selectIndex = (state) => state.photo.index;

export const { showModal } = photoSlice.actions;
export default photoSlice.reducer;
