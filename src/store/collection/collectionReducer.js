import {
    COLLECTION_FETCH_SINGLE_COLLECTION_ERROR,
  COLLECTION_FETCH_SINGLE_COLLECTION_PENDING,
  COLLECTION_FETCH_SINGLE_COLLECTION_SUCCESS,
} from './collectionTypes';

const initialState = {
  collection: {},
  error: null,
};

const collectionReducer = (state = initialState, action) => {
  switch (action.type) {
    case COLLECTION_FETCH_SINGLE_COLLECTION_PENDING:
      return {
        ...state,
        error: null,
      };
    case COLLECTION_FETCH_SINGLE_COLLECTION_SUCCESS:
      return {
        ...state,
        collection: action.payload,
        error: null,
      };
    case COLLECTION_FETCH_SINGLE_COLLECTION_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default collectionReducer;
