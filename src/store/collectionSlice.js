import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import {
  getAllCollections,
  getCollection,
  getSingleCollection,
} from '@/utils/api';

// Async thunks
export const fetchSingleCollection = createAsyncThunk(
  'collections/fetchSingleCollection',
  async (collectionId, { rejectWithValue }) => {
    try {
      const response = await axios(getSingleCollection(collectionId));
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const fetchCollection = createAsyncThunk(
  'collections/fetchCollection',
  async ({ collectionId, page = 1, perPage = 50 }, { rejectWithValue }) => {
    try {
      const response = await axios(
        getCollection({ collectionId, page, perPage }),
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const fetchCollections = createAsyncThunk(
  'collections/fetchCollections',
  async ({ page, perPage }, { getState, rejectWithValue }) => {
    const state = getState();
    try {
      const response = await axios(
        getAllCollections({
          page: page || state.collections.page,
          perPage: perPage || state.collections.perPage,
        }),
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

// Handle fetchSingleCollection actions
const handleFetchSingleCollection = (builder) => {
  builder
    .addCase(fetchSingleCollection.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(fetchSingleCollection.fulfilled, (state, action) => {
      state.collection = action.payload;
      state.isLoading = false;
      state.error = null;
    })
    .addCase(fetchSingleCollection.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
};

// Handle fetchCollection actions
const handleFetchCollection = (builder) => {
  builder
    .addCase(fetchCollection.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(fetchCollection.fulfilled, (state, action) => {
      state.userPhotoCollection = [
        ...state.userPhotoCollection,
        ...action.payload,
      ];
      state.page += 1;
      state.isLoading = false;
      state.hasMore = Boolean(action.payload.length);
      state.error = null;
    })
    .addCase(fetchCollection.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
};

// Handle fetchCollections actions
const handleFetchCollections = (builder) => {
  builder
    .addCase(fetchCollections.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(fetchCollections.fulfilled, (state, action) => {
      state.collections = [...state.collections, ...action.payload];
      state.isLoading = false;
      state.hasMore = Boolean(action.payload.length);
      state.error = null;
    })
    .addCase(fetchCollections.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
};

const initialState = {
    userPhotoCollection: [],
    collections: [],
    collection: {},
    hasMore: true,
    isLoading: false,
    index: -1,
    page: 1,
    perPage: 30,
    error: null,
  },
  collectionsSlice = createSlice({
    name: 'collections',
    initialState,
    reducers: {
      clearUserCollection: (state) => {
        state.userPhotoCollection = [];
      },
    },
    extraReducers: (builder) => {
      handleFetchSingleCollection(builder);
      handleFetchCollection(builder);
      handleFetchCollections(builder);
    },
  });

// Export actions and reducer
export const { clearUserCollection, openModal } = collectionsSlice.actions;
export default collectionsSlice.reducer;
