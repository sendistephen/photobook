import {
  FAVORITES_ADD_PHOTO_TO_FAVORITES_ERROR,
  FAVORITES_ADD_PHOTO_TO_FAVORITES_SUCCESS,
  FAVORITES_DELETE_PHOTO_FROM_FAVORITES,
  FAVORITES_FETCH_FAVORITES_PHOTOS_PENDING,
  FAVORITES_FETCH_FAVORITES_PHOTOS_SUCCESS,
  SHOW_MODAL,
} from './favoritesTypes';

const initialState = {
  photos: [],
  hasMore: true,
  loading: false,
  index: -1,
  error: null,
};

const favoritesReducer = (state = initialState, action) => {
  switch (action.type) {
    case FAVORITES_FETCH_FAVORITES_PHOTOS_PENDING:
      return {
        ...state,
        loading: true,
      };
    case FAVORITES_FETCH_FAVORITES_PHOTOS_SUCCESS:
      return {
        ...state,
        photos: action.payload,
        loading: false,
      };
    case FAVORITES_ADD_PHOTO_TO_FAVORITES_SUCCESS:
      return {
        ...state,
        photos: action.payload,
        hasMore: !!action.payload.length,
      };

    case FAVORITES_DELETE_PHOTO_FROM_FAVORITES:
      return {
        ...state,
        photos: state.photos.filter((photo) => photo.id !== action.payload),
        loading: false,
      };
    case FAVORITES_ADD_PHOTO_TO_FAVORITES_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
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
export const getFavoritedPhotos = (state) => state.favorites;
export default favoritesReducer;
