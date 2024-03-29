import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { getUserCollections, getUserPhotosUrl, getUserUrl } from 'utils/api';

// Async thunk for fetching user details
export const fetchUser = createAsyncThunk(
  'user/fetchUser',
  async (username, { rejectWithValue }) => {
    try {
      const response = await axios(getUserUrl(username));
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk for fetching user photos
export const fetchUserPhotos = createAsyncThunk(
  'user/fetchUserPhotos',
  async ({ username, page, perPage = 5 }, { rejectWithValue }) => {
    try {
      const response = await axios(
        getUserPhotosUrl({ username, page, perPage })
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk for fetching user collections
export const fetchUserCollections = createAsyncThunk(
  'user/fetchUserCollections',
  async ({ username, page = 1, perPage = 10 }, { rejectWithValue }) => {
    try {
      const response = await axios(
        getUserCollections({ username, page, perPage })
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
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
};

const userSlice = createSlice({
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
    builder
      // Handle fetchUser
      .addCase(fetchUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Handle fetchUserPhotos
      .addCase(fetchUserPhotos.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUserPhotos.fulfilled, (state, action) => {
        const newPhotos = action.payload;
        const existingPhotoIds = new Set(state.photos.map((photo) => photo.id));
        const mergedPhotos = [
          ...state.photos,
          ...newPhotos.filter((photo) => !existingPhotoIds.has(photo.id)),
        ];
        state.photos = mergedPhotos;
        state.isLoading = false;
        state.hasMore = newPhotos.length === state.perPage;
      })
      .addCase(fetchUserPhotos.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Handle fetchUserCollections
      .addCase(fetchUserCollections.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUserCollections.fulfilled, (state, action) => {
        state.collections = [...state.collections, ...action.payload];
        state.isLoading = false;
        state.hasMore = !!action.payload.length;
      })
      .addCase(fetchUserCollections.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

// Export actions and reducer
export const { clearUserPhotos, openModal, hideModal } = userSlice.actions;
export default userSlice.reducer;
