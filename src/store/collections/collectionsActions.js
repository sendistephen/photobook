import axios from 'axios';
import { getCollection } from 'utils/api';
import { getPage, getPerPage } from './collectionsReducer';
import {
  COLLECTION_FETCH_COLLECTION_PENDING,
  COLLECTION_FETCH_COLLECTION_SUCCESS,
  COLLECTION_FETCH_COLLECTION_ERROR,
  SHOW_MODAL,
} from './collectionsTypes';

export const fetchCollection = (collectionId) => async (dispatch, getState) => {
  try {
    dispatch({
      type: COLLECTION_FETCH_COLLECTION_PENDING,
    });
    const url = getCollection({
      collectionId,
      page: getPage(getState()),
      perPage: getPerPage(getState()),
    });
    const res = await axios(url);
    const data = res.data;
    dispatch({
      type: COLLECTION_FETCH_COLLECTION_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: COLLECTION_FETCH_COLLECTION_ERROR,
      payload: error.message,
    });
  }
};
export const handleModal = (index) => (dispatch) => {
  dispatch({
    type: SHOW_MODAL,
    payload: index,
  });
};
