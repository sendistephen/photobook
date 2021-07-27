import {
  USER_FETCH_USER_PHOTOS_ERROR,
  USER_FETCH_USER_PHOTOS_PENDING,
  USER_FETCH_USER_PHOTOS_SUCCESS,
  USER_SHOW_MODAL,
} from './userPhotosTypes';

const initialState = {
  photos: [],
  page: 1,
  perPage: 10,
  hasMore: true,
  index: -1,
  error: '',
};

const userPhotosReducer = (state = initialState, action) => {
  switch (action.type) {
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
    case USER_SHOW_MODAL:
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
export default userPhotosReducer;
