import { getSavedPhotosFromLS } from './favoritesReducer';
import { ADD_PHOTO_TO_FAVORITES, SHOW_MODAL } from './favoritesTypes';

export const addPhotoToFavorites = (photo) => (dispatch, getState) => {
  const state = getState();
  const favorites = { ...getSavedPhotosFromLS(state) };
  // check if photo already exists and remove it
  if (favorites[photo.id]) {
    delete favorites[photo.id];
    dispatch({
      type: ADD_PHOTO_TO_FAVORITES,
      payload: favorites,
    });
  } else {
    //   photo doesnot exist...add it
    favorites[photo.id] = photo;
    dispatch({
      type: ADD_PHOTO_TO_FAVORITES,
      payload: favorites,
    });
  }
};
export const handleModal = (index) => (dispatch) => {
  dispatch({
    type: SHOW_MODAL,
    payload: index,
  });
};