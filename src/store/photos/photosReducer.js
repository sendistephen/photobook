import {
  PHOTOS_FETCH_PHOTOS_ERROR,
  PHOTOS_FETCH_PHOTOS_PENDING,
  PHOTOS_FETCH_PHOTOS_SUCCESS,
  SHOW_MODAL,
} from './photosTypes';

const initialState = {
  photos: [],
  isLoading: false,
  page: 1,
  perPage: 50,
  hasMore: true,
  index: -1,
  error: null,
};

const photosReducer = (state = initialState, action) => {
  switch (action.type) {
    case PHOTOS_FETCH_PHOTOS_PENDING:
      return {
        ...state,
        isLoading: true,
      };

    case PHOTOS_FETCH_PHOTOS_SUCCESS:
      return {
        ...state,
        photos: [...state.photos, ...action.payload],
        isLoading: false,
        page: state.page + 1,
        hasMore: !!action.payload.length,
      };
    case PHOTOS_FETCH_PHOTOS_ERROR:
      return {
        ...state,
        isLoading: false,
      };
    case SHOW_MODAL:
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
export default photosReducer;
