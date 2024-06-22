import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import { getCollections, getSearchResults } from '../utils/api';

const fetchApiData = async (apiCall, { query, page, perPage }) => {
  const response = await axios(apiCall({ query, page, perPage }));
  return Array.isArray(response.data.results) ? response.data.results : [];
};

// Generic async thunk for fetching search results
const createFetchThunk = (type, apiCall) => {
  return createAsyncThunk(
    type,
    async ({ query, page = 1, perPage = 50 }, { rejectWithValue }) => {
      if (!query) {
        return [];
      }
      try {
        const results = await fetchApiData(apiCall, {
          query,
          page,
          perPage,
        });
        return { results, page };
      } catch (error) {
        return rejectWithValue(error.message);
      }
    },
  );
};
// Async thunk for fetching search results for photos
export const fetchPhotos = createFetchThunk(
  'search/fetchPhotos',
  getSearchResults,
);

// Async thunk for fetching search results for collections
export const fetchCollections = createFetchThunk(
  'search/fetchCollections',
  getCollections,
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
  state[key] = [...state[key], ...action.payload.results];
  state.page = action.payload.page + 1;
  state.isLoading = false;
  state.hasMore = Boolean(action.payload.results.length);
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
