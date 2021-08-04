import { ADD_PHOTO_TO_FAVORITES, SHOW_MODAL } from './favoritesTypes';

const initialState = {
  photos: {},
  hasMore: true,
  isLoading: false,
  index: -1,
  error: null,
};

const favoritesReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_PHOTO_TO_FAVORITES:
      return {
        ...state,
        photos: action.payload,
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

export const getSavedPhotosFromLS = (state) => state.favorites.photos;
export const getFavoritedPhotos = (state) => state.favorites;
export default favoritesReducer;
