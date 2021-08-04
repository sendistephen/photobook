import axios from 'axios';

import { getSingleCollection } from 'utils/api';
import {
  COLLECTION_FETCH_SINGLE_COLLECTION_PENDING,
  COLLECTION_FETCH_SINGLE_COLLECTION_SUCCESS,
  COLLECTION_FETCH_SINGLE_COLLECTION_ERROR,
} from './collectionTypes';

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
