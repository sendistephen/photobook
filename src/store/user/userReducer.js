import {
  USER_FETCH_USER_ERROR,
  USER_FETCH_USER_PENDING,
  USER_FETCH_USER_SUCCESS,
  USER_FETCH_USER_PHOTOS_ERROR,
  USER_FETCH_USER_PHOTOS_PENDING,
  USER_FETCH_USER_PHOTOS_SUCCESS,
  USER_FETCH_USER_COLLECTIONS_SUCCESS,
  USER_FETCH_USER_COLLECTIONS_PENDING,
  USER_FETCH_USER_COLLECTIONS_ERROR,
  USER_CLEAR_USER_PHOTOS,
  OPEN_MODAL,
} from './userTypes';

const initialState = {
  user: {},
  photos: [],
  collections: [],
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
        hasMore:!!action.payload.length,
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
    case USER_FETCH_USER_COLLECTIONS_PENDING:
      return {
        ...state,
        isLoading: true,
      };
    case USER_FETCH_USER_COLLECTIONS_SUCCESS:
      return {
        ...state,
        collections: [...state.collections, ...action.payload],
        isLoading:false,
        hasMore: !!action.payload.length,
      };
    case USER_FETCH_USER_COLLECTIONS_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case USER_CLEAR_USER_PHOTOS:
      return {
        ...state,
        photos: [],
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
