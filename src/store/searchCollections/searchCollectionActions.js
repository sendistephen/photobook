import axios from 'axios';
import { getCollections } from 'utils/api';
import { getPage, getPerPage } from './searchCollectionsReducer';
import {
  SEARCH_COLLECTIONS_ERROR,
  SEARCH_COLLECTIONS_PENDING,
  SEARCH_COLLECTIONS_SUCCESS,
} from './searchCollectionsTypes';

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
