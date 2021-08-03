const { TOGGLE_THEME_CHANGE } = require('./themeTypes');

const initialState = {
  darkThemeEnabled: false,
};

const togglDarkThemeReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_THEME_CHANGE:
      return {
        ...state,
        darkThemeEnabled: !state.darkThemeEnabled,
      };
    default:
      return state;
  }
};
export const getThemePreference = (state) => state.theme;
export default togglDarkThemeReducer;
