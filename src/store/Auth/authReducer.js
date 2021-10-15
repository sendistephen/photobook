import { SET_USER_TOKEN_PENDING, SET_USER_TOKEN_SUCCESS } from './authTypes';
import { getFavorites } from 'store/favorites/favoritesActions';

const initialState = {
  user: null,
  token: null,
  isLoading: false,
  isAuthenticated: false,
};
export const setUserToken = (user, token) => (dispatch, getState) => {
  dispatch({
    type: SET_USER_TOKEN_SUCCESS,
    payload: {
      user,
      token,
    },
  });
  dispatch(getFavorites());
};
function authReducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER_TOKEN_PENDING:
      return {
        ...state,
        isLoading: true,
      };
    case SET_USER_TOKEN_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: true,
      };
    default:
      return state;
  }
}

export default authReducer;
