import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { getURL } from 'utils/api';

const initialState = {
  photos: [],
  isLoading: false,
  page: 1,
  perPage: 50,
  hasMore: true,
  index: null,
  error: null,
};

export const fetchPhotos = createAsyncThunk(
  'photos/fetchPhotos',
  async (_, { getState }) => {
    const state = getState();
    const url = getURL({
      page: state.photos.page,
      per_page: state.photos.perPage,
    });

    const response = await axios(url);
    return response.data;
  }
);

const photosSlice = createSlice({
  name: 'photos',
  initialState,
  reducers: {
    showModal: (state, action) => {
      state.index = action.payload;
    },
    hideModal: (state) => {
      state.index = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPhotos.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchPhotos.fulfilled, (state, action) => {
        state.photos = [...state.photos, ...action.payload];
        state.isLoading = false;
        state.page += 1;
        state.hasMore = !!action.payload.length;
      })
      .addCase(fetchPhotos.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

// Selectors
export const selectPhotos = (state) => state.photos.photos;
export const selectIsLoading = (state) => state.photos.isLoading;
export const selectHasMore = (state) => state.photos.hasMore;
export const selectCurrentPage = (state) => state.photos.page;
export const selectPerPage = (state) => state.photos.perPage;
export const selectIndex = (state) => state.photos.index;

export const { showModal, hideModal } = photosSlice.actions;
export default photosSlice.reducer;
