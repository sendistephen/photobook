import axios from 'axios';
import { getUserUrl } from 'utils/api';
import {
  USER_FETCH_USER_PENDING,
  USER_FETCH_USER_SUCCESS,
  USER_FETCH_USER_ERROR,
} from './userTypes';

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
