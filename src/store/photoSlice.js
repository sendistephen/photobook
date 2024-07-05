import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { fetchData, getPhotoUrl } from '../utils/api';

// Async thunk for fetching a single photo
export const fetchPhoto = createAsyncThunk(
  'photo/fetchPhoto',
  async (id, { rejectWithValue }) => {
    return fetchData(getPhotoUrl, id, rejectWithValue);
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
      });
  },
});

// Selectors
export const selectPhoto = (state) => state.photo.photo;
export const selectIsLoading = (state) => state.photo.isLoading;
export const selectError = (state) => state.photo.error;
export const selectIndex = (state) => state.photo.index;

export const { showModal } = photoSlice.actions;
export default photoSlice.reducer;
