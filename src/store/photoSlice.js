import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { getPhotoUrl, getSingleTopic } from '@/utils/api';

// Async thunk for fetching a single photo
export const fetchPhoto = createAsyncThunk(
  'photo/fetchPhoto',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios(getPhotoUrl(id));
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

// Async thunk for fetching photo topics
export const fetchPhotoTopic = createAsyncThunk(
  'photo/fetchPhotoTopic',
  async (searchWord, { rejectWithValue }) => {
    try {
      const response = await axios(getSingleTopic(searchWord));
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
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
  reducers: {
    // Synchronous action for handling modal visibility
    showModal: (state, action) => {
      state.index = action.payload;
    },
  },
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
