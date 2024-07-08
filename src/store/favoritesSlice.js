import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { deleteDoc, doc, getFirestore, setDoc } from 'firebase/firestore';

import { handleAsyncThunkCases } from '../utils/helper';

// Async thunk for adding a favorite photo
export const addFavoritePhoto = createAsyncThunk(
  'favorites/addFavoritePhoto',
  async (photoObj, { getState, rejectWithValue }) => {
    const { user } = getState().auth,
      db = getFirestore(),
      photoRef = doc(db, `users/${user.uid}/favorites`, photoObj.id);

    try {
      // Set the photo in the user's favorites' collection in Firestore
      await setDoc(photoRef, photoObj, { merge: true });
      return photoObj;
    } catch (error) {
      console.error('Error adding favorite photo to Firestore: ', error);
      return rejectWithValue('Photo already exists in favorites');
    }
  },
);

// Async thunk for removing a favorite photo
export const removeFavoritePhoto = createAsyncThunk(
  'favorites/removeFavoritePhoto',
  async (photoID, { getState, rejectWithValue }) => {
    const { user } = getState().auth;

    if (!user) {
      return rejectWithValue('User not authenticated');
    }

    const db = getFirestore(),
      photoRef = doc(db, `users/${user.uid}/favorites`, photoID);

    try {
      await deleteDoc(photoRef);
      return photoID;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

const initialState = {
    photos: [],
    isLoading: false,
    error: null,
    index: -1,
  },
  favoritesSlice = createSlice({
    name: 'favorites',
    initialState,
    reducers: {
      addFavoritePhotoOptimistic: (state, action) => {
        const photoExists = state.photos.some(
          (photo) => photo.id === action.payload.id,
        );
        if (!photoExists) {
          state.photos.push(action.payload);
        }
      },
      removeFavoritePhotoOptmistic: (state, action) => {
        state.photos = state.photos.filter(
          (photo) => photo.id !== action.payload,
        );
      },
    },
    extraReducers: (builder) => {
      builder;

      handleAsyncThunkCases(builder, addFavoritePhoto, {
        fulfilled: (state, action) => {
          const index = state.photos.findIndex(
            (photo) => photo.id === action.payload.id,
          );
          if (index === -1) state.photos.push(action.payload);
        },
      });
      handleAsyncThunkCases(builder, removeFavoritePhoto, {
        fulfilled: (state, action) => {
          state.photos = state.photos.filter(
            (photo) => photo.id !== action.payload,
          );
        },
      });
    },
  });

export const { removeFavoritePhotoOptmistic, addFavoritePhotoOptimistic } =
  favoritesSlice.actions;
export default favoritesSlice.reducer;
