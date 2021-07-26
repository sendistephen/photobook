import axios from 'axios';
import { getURL } from 'utils/api';
import { getPage } from './photosReducer';
import {
  PHOTOS_FETCH_PHOTOS_ERROR,
  PHOTOS_FETCH_PHOTOS_PENDING,
  PHOTOS_FETCH_PHOTOS_SUCCESS,
  SHOW_MODAL,
} from './photosTypes';

export const fetchPhotos = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: PHOTOS_FETCH_PHOTOS_PENDING,
    });
    // make a fetch request to the api GET/photos end point
    const url = getURL({
      page: getPage(getState()),
      per_page: getState().photos.perPage,
    });

    const response = await axios(url);
    const data = response.data;
    dispatch({
      type: PHOTOS_FETCH_PHOTOS_SUCCESS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: PHOTOS_FETCH_PHOTOS_ERROR,
    });
  }
};

export const handleModal = (index) => (dispatch) => {
  dispatch({
    type: SHOW_MODAL,
    payload: index,
  });
};
