import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { onAuthStateChanged } from '@firebase/auth';
import { auth } from '@/firebase/firebase-config';

const initialState = {
  user: null,
  isAuthenticated: false,
  isIntializing: true,
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
      state.isInitializing = false;
      state.isLoading = false;
    },
    clearUser(state) {
      state.user = null;
      state.isAuthenticated = false;
      state.isInitializing = false;
      state.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(observeAuthState.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(observeAuthState.fulfilled, (state, action) => {
        state.isInitializing = false;
      })
      .addCase(observeAuthState.rejected, (state, action) => {
        state.error = action.error.message;
        state.isInitializing = false;
        state.isLoading = false;
      });
  },
});
export const { setUser, clearUser } = authSlice.actions;
export default authSlice.reducer;
