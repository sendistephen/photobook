import axios from 'axios';
import { getPhotoUrl, getSingleTopic } from 'utils/api';
import {
  PHOTO_FETCH_PHOTO_PENDING,
  PHOTO_FETCH_PHOTO_SUCCESS,
  PHOTO_FETCH_PHOTO_ERROR,
  SHOW_MODAL,
  PHOTO_FETCH_PHOTO_TOPIC_SUCCESS,
  PHOTO_FETCH_PHOTO_TOPIC_PENDING,
  PHOTO_FETCH_PHOTO_TOPIC_ERROR,
} from './photoTypes';

export const fetchPhotoTopic = (searchWord) => async (dispatch) => {
  try {
    dispatch({
      type: PHOTO_FETCH_PHOTO_TOPIC_PENDING,
    });
    const url = getSingleTopic(searchWord);
    const res = await axios(url);
    const data = res.data;
    dispatch({
      type: PHOTO_FETCH_PHOTO_TOPIC_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PHOTO_FETCH_PHOTO_TOPIC_ERROR,
      payload: error.message,
    });
  }
};
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
export const handleModal = (index) => (dispatch) => {
  dispatch({
    type: SHOW_MODAL,
    payload: index,
  });
};
