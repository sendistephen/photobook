import axios from 'axios';
import { getCollections, getSearchResults } from 'utils/api';
import { getPage, getPerPage } from './searchReducer';
import {
  SEARCH_PHOTOS_PENDING,
  SEARCH_PHOTOS_SUCCESS,
  SEARCH_PHOTOS_ERROR,
  SEARCH_CLEAR_PHOTOS,
  SHOW_MODAL,
  SEARCH_COLLECTIONS_PENDING,
  SEARCH_COLLECTIONS_SUCCESS,
  SEARCH_COLLECTIONS_ERROR,
  SEARCH_CLEAR_COLLECTIONS,
  SEARCH_ACTIVE_TAB,
} from './searchTypes';

export const fetchPhotos = (searchWord) => async (dispatch, getState) => {
  try {
    dispatch({
      type: SEARCH_PHOTOS_PENDING,
    });
    const url = getSearchResults({
      query: searchWord,
      page: getPage(getState()),
      perPage: getPerPage(getState()),
    });
    const res = await axios(url);
    const data = res.data.results;
    dispatch({
      type: SEARCH_PHOTOS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: SEARCH_PHOTOS_ERROR,
      payload: error.message,
    });
  }
};
export const clearPhotos = () => (dispatch) => {
  dispatch({
    type: SEARCH_CLEAR_PHOTOS,
  });
};
export const handleModal = (index) => (dispatch) => {
  dispatch({
    type: SHOW_MODAL,
    payload: index,
  });
};
export const fetchCollections = (searchWord) => async (dispatch, getState) => {
  try {
    dispatch({
      type: SEARCH_COLLECTIONS_PENDING,
    });
    const url = getCollections({
      query: searchWord,
      page: getPage(getState()),
      perPage: getPerPage(getState()),
    });
    const res = await axios(url);
    const data = res.data.results;
    dispatch({
      type: SEARCH_COLLECTIONS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: SEARCH_COLLECTIONS_ERROR,
      payload: error.message,
    });
  }
};

export const clearCollection = () => (dispatch) => {
  dispatch({
    type: SEARCH_CLEAR_COLLECTIONS,
  });
};

export const handleTabClick = (tab) => (dispatch) => {
  dispatch({
    type: SEARCH_ACTIVE_TAB,
    payload: tab,
  });
};
