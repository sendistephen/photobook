import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = import.meta.env.VITE_APP_PHOTO_SERVER_API;

// Async thunk for fetching favorite photos
export const getFavorites = createAsyncThunk(
  'favorites/getFavorites',
  async (_, { getState, rejectWithValue }) => {
    const { auth } = getState();
    const { token } = auth;
    try {
      const response = await axios.get(`${API_URL}/photos/favorites`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data.reduce((acc, el) => ({ ...acc, [el.id]: el }), {});
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk for adding a favorite photo
export const addFavoritePhoto = createAsyncThunk(
  'favorites/addFavoritePhoto',
  async (photoObj, { getState, rejectWithValue }) => {
    const { auth } = getState();
    const { token } = auth;
    try {
      const response = await axios.post(
        `${API_URL}/photos/favorites`,
        photoObj,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      if (error.code === 11000) {
        return rejectWithValue('Photo already exists in favorites');
      }
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk for removing a favorite photo
export const removeFavoritePhoto = createAsyncThunk(
  'favorites/removeFavoritePhoto',
  async (photoID, { getState, rejectWithValue }) => {
    const { auth } = getState();
    const { token } = auth;
    try {
      await axios.delete(`${API_URL}/photos/favorites/${photoID}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return photoID;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  photos: {},
  isLoading: false,
  error: null,
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    showModal: (state, action) => {
      state.index = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFavorites.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getFavorites.fulfilled, (state, action) => {
        state.photos = action.payload;
        state.isLoading = false;
      })
      .addCase(getFavorites.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(addFavoritePhoto.fulfilled, (state, action) => {
        state.photos[action.payload.id] = action.payload;
      })
      .addCase(removeFavoritePhoto.fulfilled, (state, action) => {
        delete state.photos[action.payload];
      })
      .addCase(addFavoritePhoto.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(removeFavoritePhoto.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { showModal } = favoritesSlice.actions;
export default favoritesSlice.reducer;
