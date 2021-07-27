import axios from 'axios';
import { getUserPhotosUrl } from 'utils/api';
import { getPage, getPerPage } from './userPhotosReducer';
import {
  USER_FETCH_USER_PHOTOS_ERROR,
  USER_FETCH_USER_PHOTOS_PENDING,
  USER_FETCH_USER_PHOTOS_SUCCESS,
  USER_SHOW_MODAL,
} from './userPhotosTypes';

export const fetchUserPhotos = (username) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_FETCH_USER_PHOTOS_PENDING,
    });

    const url = getUserPhotosUrl({
      username,
      page: getPage(getState()),
      perPage: getPerPage(getState()),
    });
    const res = await axios(url);
    const data = res.data;
    dispatch({
      type: USER_FETCH_USER_PHOTOS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_FETCH_USER_PHOTOS_ERROR,
      payload: error.message,
    });
  }
};

export const handleModal = (index) => (dispatch) => {
  dispatch({
    type: USER_SHOW_MODAL,
    payload: index,
  });
};