import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    darkThemeEnabled: false,
  },
  themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
      // This action toggles the theme between dark and light
      toggleThemeChange: (state) => {
        state.darkThemeEnabled = !state.darkThemeEnabled;
      },
    },
  });

// Export the action creator and the reducer
export const { toggleThemeChange } = themeSlice.actions;
export default themeSlice.reducer;
