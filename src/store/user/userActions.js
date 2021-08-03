import axios from 'axios';
import { getUserUrl } from 'utils/api';
import {
  USER_FETCH_USER_PENDING,
  USER_FETCH_USER_SUCCESS,
  USER_FETCH_USER_ERROR,
  USER_FETCH_USER_PHOTOS_ERROR,
  USER_FETCH_USER_PHOTOS_PENDING,
  USER_FETCH_USER_PHOTOS_SUCCESS,
  OPEN_MODAL,
} from './userTypes';
import { getUserPhotosUrl } from 'utils/api';
import { getPage, getPerPage } from './userReducer';

export const fetchUser = (username) => async (dispatch) => {
  try {
    dispatch({
      type: USER_FETCH_USER_PENDING,
    });

    const url = getUserUrl(username);
    const res = await axios(url);
    const data = res.data;
    dispatch({
      type: USER_FETCH_USER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_FETCH_USER_ERROR,
      payload: error.message,
    });
  }
};
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
    type: OPEN_MODAL,
    payload: index,
  });
};
