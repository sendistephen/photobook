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
};

const handlePending = (state) => {
  state.isLoading = true;
};

const handleFulfilled = (state, action, key) => {
  state[key] = [...state[key], ...action.payload];
  state.page += 1;
  state.isLoading = false;
  state.hasMore = Boolean(action.payload.length);
  state.error = null;
};

const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

const searchSlice = createSlice({
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
      .addCase(fetchPhotos.pending, handlePending)
      .addCase(fetchPhotos.fulfilled, (state, action) =>
        handleFulfilled(state, action, 'photos'),
      )
      .addCase(fetchPhotos.rejected, handleRejected)
      .addCase(fetchCollections.pending, handlePending)
      .addCase(fetchCollections.fulfilled, (state, action) =>
        handleFulfilled(state, action, 'collections'),
      )
      .addCase(fetchCollections.rejected, handleRejected);
  },
});

// Export actions and reducer
export const { clearPhotos, clearCollections, handleModal, handleTabClick } =
  searchSlice.actions;
export default searchSlice.reducer;
