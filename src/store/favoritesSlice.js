import {
  doc,
  setDoc,
  getFirestore,
  collection,
  getDocs,
  deleteDoc,
} from 'firebase/firestore';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// const API_URL = import.meta.env.VITE_APP_PHOTO_SERVER_API;

// Async thunk for fetching favorite photos
export const getFavorites = createAsyncThunk(
  'favorites/getFavorites',
  async (_, { getState, rejectWithValue }) => {
    const { user } = getState().auth; // get user from redux state...
    console.log('user', user);
    // handle unauthenticated access
    if (!user) return rejectWithValue('User not authenticated');

    const db = getFirestore();

    const favoritesCollectionRef = collection(
      db,
      `users/${user.uid}/favorites`
    );
    try {
      // fetch all docs from the favorites collection
      const querySnapShot = await getDocs(favoritesCollectionRef);
      const favorites = [];
      querySnapShot.forEach((doc) => {
        // push each favorite into the array with the document ID included
        favorites.push({ id: doc.id, ...doc.data() });
      });
      return favorites; // array of favorites
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk for adding a favorite photo
export const addFavoritePhoto = createAsyncThunk(
  'favorites/addFavoritePhoto',
  async (photoObj, { getState, rejectWithValue }) => {
    const { user } = getState().auth;

    const db = getFirestore();
    const photoRef = doc(db, `users/${user.uid}/favorites`, photoObj.id);

    try {
      // set the photo in the user's favorites' collection in Firestore
      await setDoc(photoRef, photoObj, { merge: true });
      return photoObj;
    } catch (error) {
      console.error('Error adding favorite photo to Firestore: ', error);
      return rejectWithValue('Photo already exists in favorites');
    }
  }
);

// Async thunk for removing a favorite photo
export const removeFavoritePhoto = createAsyncThunk(
  'favorites/removeFavoritePhoto',
  async (photoID, { getState, rejectWithValue }) => {
    const { user } = getState().auth;

    if (!user) return rejectWithValue('User not authenticated');

    const db = getFirestore();
    const photoRef = doc(db, `users/${user.uid}/favorites`, photoID);

    try {
      await deleteDoc(photoRef);
      return photoID;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  photos: [],
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
  reducers: {
    addFavoritePhotoOptimistic: (state, action) => {
      const photoExists = state.photos.some(
        (photo) => photo.id === action.payload.id
      );
      if (!photoExists) {
        state.photos.push(action.payload);
      }
    },
    removeFavoritePhotoOptmistic: (state, action) => {
      state.photos = state.photos.filter(
        (photo) => photo.id !== action.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFavorites.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getFavorites.fulfilled, (state, action) => {
        console.log(action.payload);
        state.photos = action.payload;
        state.isLoading = false;
      })
      .addCase(getFavorites.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(addFavoritePhoto.fulfilled, (state, action) => {
        const index = state.photos.findIndex(
          (photo) => photo.id === action.payload.id
        );
        if (index === -1) {
          state.photos.push(action.payload);
        }
      })
      .addCase(removeFavoritePhoto.fulfilled, (state, action) => {
        state.photos = state.photos.filter(
          (photo) => photo.id !== action.payload
        );
      })
      .addCase(addFavoritePhoto.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(removeFavoritePhoto.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const {
  showModal,
  removeFavoritePhotoOptmistic,
  addFavoritePhotoOptimistic,
} = favoritesSlice.actions;
export default favoritesSlice.reducer;
