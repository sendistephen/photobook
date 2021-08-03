const { TOGGLE_THEME_CHANGE } = require('./themeTypes');

export const handleToggleThemeChange = () => (dispatch) => {
  dispatch({
    type: TOGGLE_THEME_CHANGE,
  });
};
