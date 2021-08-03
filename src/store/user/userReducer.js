import {
  USER_FETCH_USER_ERROR,
  USER_FETCH_USER_PENDING,
  USER_FETCH_USER_SUCCESS,
  USER_FETCH_USER_PHOTOS_ERROR,
  USER_FETCH_USER_PHOTOS_PENDING,
  USER_FETCH_USER_PHOTOS_SUCCESS,
  OPEN_MODAL,
} from './userTypes';

const initialState = {
  user: {},
  photos: [],
  isLoading: false,
  page: 1,
  perPage: 10,
  hasMore: true,
  index: -1,
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
    case USER_FETCH_USER_PHOTOS_PENDING:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case USER_FETCH_USER_PHOTOS_SUCCESS:
      return {
        ...state,
        photos: [...state.photos, ...action.payload],
        isLoading: false,
        page: state.page + 1,
        hasMore: !!action.payload.length,
        error: null,
      };
    case USER_FETCH_USER_PHOTOS_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case OPEN_MODAL:
      return {
        ...state,
        index: action.payload,
      };
    default:
      return state;
  }
};
export const getPage = (state) => state.photos.page;
export const getPerPage = (state) => state.photos.perPage;
export default userReducer;
