import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getFavorites } from './favoritesSlice';

const initialState = {
  user: null,
  token: null,
  isLoading: false,
  isAuthenticated: false,
};

// Assuming setUserToken could potentially be an async operation in the future
export const setUserToken = createAsyncThunk(
  'auth/setUserToken',
  async ({ user, token }, { dispatch }) => {
    // Simulate setting user token (e.g., saving to local storage or validating token)
    // For now, we'll directly return the user and token as the operation is synchronous
    dispatch(getFavorites());
    return { user, token };
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(setUserToken.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(setUserToken.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.isLoading = false;
      });
    //TODO: You can handle setUserToken.rejected here if there's an error during the async operation
  },
});

export default authSlice.reducer;
