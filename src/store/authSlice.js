import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getFavorites } from './favoritesSlice';
import { getAuth, onAuthStateChanged } from '@firebase/auth';

const initialState = {
  user: null,
  isAuthenticated: false,
  isLoading: true,
  error: null,
};

const extractUserData = (user) => ({
  uid: user.uid,
  displayName: user.displayName,
  email: user.email,
  photoURL: user.photoURL,
});

export const observeAuthState = createAsyncThunk(
  'auth/observeAuthState',
  async (_, { dispatch }) => {
    const auth = getAuth();

    return new Promise((resolve) => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          const userData = extractUserData(user);

          dispatch(setUser({ user: userData }));
          resolve(userData);
        } else {
          dispatch(clearUser());
          resolve(null);
        }
      });
      return () => unsubscribe();
    });
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload.user;
      state.isAuthenticated = true;
      state.isLoading = false;
    },
    clearUser(state) {
      state.user = null;
      state.isAuthenticated = false;
      state.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(observeAuthState.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(observeAuthState.fulfilled, (state, action) => {
        // The user state is already set by the subscriber callbacks
      })
      .addCase(observeAuthState.rejected, (state, action) => {
        state.error = action.error.message;
        state.isLoading = false;
      });
  },
});
export const { setUser, clearUser } = authSlice.actions;
export default authSlice.reducer;
