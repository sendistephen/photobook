import axios from 'axios';
import { getPhotoUrl } from 'utils/api';
import {
  PHOTO_FETCH_PHOTO_PENDING,
  PHOTO_FETCH_PHOTO_SUCCESS,
  PHOTO_FETCH_PHOTO_ERROR,
} from './photoTypes';

export const fetchPhoto = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PHOTO_FETCH_PHOTO_PENDING,
    });
    const url = getPhotoUrl(id);
    const res = await axios(url);
    const data = res.data;
    dispatch({
      type: PHOTO_FETCH_PHOTO_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PHOTO_FETCH_PHOTO_ERROR,
      payload: error,
    });
  }
};
