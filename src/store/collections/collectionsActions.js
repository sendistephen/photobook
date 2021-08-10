import axios from 'axios';
import {
  getAllCollections,
  getCollection,
  getSingleCollection,
} from 'utils/api';
import { getPage, getPerPage } from './collectionsReducer';
import {
  COLLECTION_FETCH_PHOTO_COLLECTION_ERROR,
  COLLECTION_FETCH_PHOTO_COLLECTION_SUCCESS,
  COLLECTION_FETCH_PHOTO_COLLECTION_PENDING,
  COLLECTION_FETCH_SINGLE_COLLECTION_PENDING,
  COLLECTION_FETCH_SINGLE_COLLECTION_SUCCESS,
  COLLECTION_FETCH_SINGLE_COLLECTION_ERROR,
  COLLECTIONS_FETCH_PHOTO_COLLECTIONS_SUCCESS,
  COLLECTIONS_FETCH_PHOTO_COLLECTIONS_PENDING,
  COLLECTIONS_FETCH_PHOTO_COLLECTIONS_ERROR,
  COLLECTION_CLEAR_USER_COLLECTION,
  SHOW_MODAL,
} from './collectionsTypes';

export const fetechSingleCollection = (collectionId) => async (dispatch) => {
  try {
    dispatch({
      type: COLLECTION_FETCH_SINGLE_COLLECTION_PENDING,
    });
    const url = getSingleCollection({
      collectionId,
    });
    const res = await axios(url);
    const data = res.data;
    dispatch({
      type: COLLECTION_FETCH_SINGLE_COLLECTION_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: COLLECTION_FETCH_SINGLE_COLLECTION_ERROR,
      payload: error.message,
    });
  }
};

export const fetchCollection = (collectionId) => async (dispatch, getState) => {
  try {
    dispatch({
      type: COLLECTION_FETCH_PHOTO_COLLECTION_PENDING,
    });
    const url = getCollection({
      collectionId,
      page: getPage(getState()),
      perPage: getPerPage(getState()),
    });
    const res = await axios(url);
    const data = res.data;
    dispatch({
      type: COLLECTION_FETCH_PHOTO_COLLECTION_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: COLLECTION_FETCH_PHOTO_COLLECTION_ERROR,
      payload: error.message,
    });
  }
};
export const fetchCollections = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: COLLECTIONS_FETCH_PHOTO_COLLECTIONS_PENDING,
    });
    const url = getAllCollections({
      page: getPage(getState()),
      perPage: getPerPage(getState()),
    });
    const res = await axios(url);
    const data = res.data;
    dispatch({
      type: COLLECTIONS_FETCH_PHOTO_COLLECTIONS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: COLLECTIONS_FETCH_PHOTO_COLLECTIONS_ERROR,
      payload: error.message,
    });
  }
};
export const clearCollection = () => (dispatch) => {
  dispatch({
    type: COLLECTION_CLEAR_USER_COLLECTION,
  });
};
export const handleModal = (index) => (dispatch) => {
  dispatch({
    type: SHOW_MODAL,
    payload: index,
  });
};
