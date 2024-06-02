import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import { getCollections, getSearchResults } from '@/utils/api';

// Async thunk for fetching search results for photos
export const fetchPhotos = createAsyncThunk(
  'search/fetchPhotos',
  async ({ query, page = 1, perPage = 50 }, { rejectWithValue }) => {
    if (!query) {
      return;
    }
    try {
      const response = await axios(getSearchResults({ query, page, perPage }));
      return response.data.results;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

// Async thunk for fetching search results for collections
export const fetchCollections = createAsyncThunk(
  'search/fetchCollections',
  async ({ query, page = 1, perPage = 50 }, { rejectWithValue }) => {
    if (!query) {
      return;
    }

    try {
      const response = await axios(getCollections({ query, page, perPage }));

      return response.data.results;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

const initialState = {
    photos: [],
    collections: [],
    activeTab: '',
    page: 1,
    perPage: 50,
    isLoading: false,
    error: null,
    hasMore: true,
  },
  searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
      clearPhotos: (state) => {
        state.photos = [];
      },
      clearCollections: (state) => {
        state.collections = [];
      },
      handleModal: (state, action) => {
        state.index = action.payload;
      },
      handleTabClick: (state, action) => {
        state.activeTab = action.payload;
      },
    },
    extraReducers: (builder) => {
      builder
        // Handle fetchPhotos
        .addCase(fetchPhotos.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(fetchPhotos.fulfilled, (state, action) => {
          state.photos = [...state.photos, ...action.payload];
          state.page += 1;
          state.isLoading = false;
          state.hasMore = Boolean(action.payload.length);
          state.error = null;
        })
        .addCase(fetchPhotos.rejected, (state, action) => {
          state.isLoading = false;
          state.error = action.payload;
        })
        // Handle fetchCollections
        .addCase(fetchCollections.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(fetchCollections.fulfilled, (state, action) => {
          state.collections = [...state.collections, ...action.payload];
          state.page += 1;
          state.isLoading = false;
          state.hasMore = Boolean(action.payload.length);
          state.error = null;
        })
        .addCase(fetchCollections.rejected, (state, action) => {
          state.isLoading = false;
          state.error = action.payload;
        });
    },
  });

// Export actions and reducer
export const { clearPhotos, clearCollections, handleModal, handleTabClick } =
  searchSlice.actions;
export default searchSlice.reducer;
