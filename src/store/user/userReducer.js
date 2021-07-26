import {
  USER_FETCH_USER_ERROR,
  USER_FETCH_USER_PENDING,
  USER_FETCH_USER_SUCCESS,
} from './userTypes';

const initialState = {
  user: {},
  isLoading: false,
  error: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_FETCH_USER_PENDING:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case USER_FETCH_USER_SUCCESS:
      return {
        ...state,
        user: action.payload,
        isLoading: false,
        error: null,
      };
    case USER_FETCH_USER_ERROR:
      return {
        ...state,
        isLoading: true,
        error: action.payload,
      };
    default:
      return state;
  }
};
export default userReducer;
