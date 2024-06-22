import { createSlice } from '@reduxjs/toolkit';

type Props = {
  darkThemeEnabled: boolean;
};

const initialState: Props = {
    darkThemeEnabled: false,
  },
  themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
      toggleThemeChange: (state) => {
        state.darkThemeEnabled = !state.darkThemeEnabled;
      },
    },
  });

export const { toggleThemeChange } = themeSlice.actions;
export default themeSlice.reducer;
