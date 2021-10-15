import axios from 'axios';
import {
  FAVORITES_ADD_PHOTO_TO_FAVORITES_PENDING,
  FAVORITES_ADD_PHOTO_TO_FAVORITES_SUCCESS,
  FAVORITES_FETCH_FAVORITES_PHOTOS_ERROR,
  FAVORITES_FETCH_FAVORITES_PHOTOS_SUCCESS,
  FAVORITES_FETCH_FAVORITES_PHOTOS_PENDING,
  FAVORITES_DELETE_PHOTO_FROM_FAVORITES,
  FAVORITES_DELETE_PHOTO_FROM_FAVORITES_ERROR,
  SHOW_MODAL,
  FAVORITES_ADD_PHOTO_TO_FAVORITES_ERROR,
} from './favoritesTypes';

const API_URL = process.env.REACT_APP_PHOTO_SERVER_API;

export const handleModal = (index) => (dispatch) => {
  dispatch({
    type: SHOW_MODAL,
    payload: index,
  });
};

// get saved photos
export const getFavorites = () => async (dispatch, getState) => {
  dispatch({ type: FAVORITES_FETCH_FAVORITES_PHOTOS_PENDING });
  const { auth } = getState();
  const { token } = auth;
  try {
    const { data } = await axios.get(`${API_URL}/photos/favorites`, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        Authorization: `Bearer ${token}`,
      },
    });

    const favorites = data.reduce((acc, el) => {
      return { ...acc, [el.id]: el };
    }, {});
    dispatch({
      type: FAVORITES_FETCH_FAVORITES_PHOTOS_SUCCESS,
      payload: favorites,
    });
  } catch (error) {
    dispatch({ type: FAVORITES_FETCH_FAVORITES_PHOTOS_ERROR, payload: error });
  }
};

// Add photo
export const addFavoritePhoto = (photoObj) => async (dispatch, getState) => {
  dispatch({
    type: FAVORITES_ADD_PHOTO_TO_FAVORITES_PENDING,
  });
  const { auth } = getState();
  const { token } = auth;

  try {
    const { data } = await axios.post(`${API_URL}/photos/favorites`, photoObj, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch({ type: FAVORITES_ADD_PHOTO_TO_FAVORITES_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: FAVORITES_ADD_PHOTO_TO_FAVORITES_ERROR, payload: error });
  }
};

// Remove photo
export const removeFavoritePhoto = (photoID) => async (dispatch, getState) => {
  const { auth } = getState();
  const { token } = auth;

  try {
    await axios.delete(`${API_URL}/photos/favorites/${photoID}`, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch({ type: FAVORITES_DELETE_PHOTO_FROM_FAVORITES, payload: photoID });
    // dispatch(getFavorites());
  } catch (error) {
    dispatch({
      type: FAVORITES_DELETE_PHOTO_FROM_FAVORITES_ERROR,
      payload: error,
    });
  }
};
